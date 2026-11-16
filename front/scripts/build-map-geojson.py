#!/usr/bin/env python3
"""Пересборка front/public/japan-prefectures.geojson — карты для компонента
visitor/Map (Leaflet, canvas-рендер, два слоя: заливки + обводки поверх).

Состав файла (FeatureCollection):
  - Япония: 47 префектур из dataofjapan/land (детальный источник GSI);
  - соседи (Китай, Россия, обе Кореи, Тайвань, Монголия) из Natural Earth 50m
    — целиком, без обрезки (Сахалин/Курилы/Камчатка — части тех же полигонов);
  - весь остальной мир из Natural Earth 50m — огрублённо, как «запас»
    на несколько экранов за пределами maxBounds карты.

Ключевое свойство: все фичи собираются в ОДНОМ топологическом прогоне.
Общие границы (Китай-Вьетнам, Россия-Китай и т.д.) имеют идентичные
последовательности вершин и заменяются одной сглаженной дугой, поэтому
швов, зазоров и двойных линий между слоями не появляется.

Сглаживание — Чейкин с доупрощением (см. параметры в main()).

Запуск из папки front:
    python3 scripts/build-map-geojson.py
Исходники скачиваются при первом запуске в ~/.cache/kamamoto-map.
"""

import argparse
import json
import os
import sys
from collections import defaultdict
from pathlib import Path

from shapely.geometry import LineString, MultiPolygon, Polygon, mapping, shape
from shapely.ops import unary_union

# --- пути ---
ROOT = Path(__file__).resolve().parent.parent          # front/
DEFAULT_OUT = ROOT / 'public' / 'japan-prefectures.geojson'
CACHE = Path.home() / '.cache' / 'kamamoto-map'

SOURCES = {
    'japan.geojson': (
        'https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson',
        'Детальная Япония (dataofjapan/land, геометрия GSI)',
    ),
    'ne50.geojson': (
        'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson',
        'Natural Earth 1:50m, страны мира',
    ),
}

# страны-соседи Японии — детальный допуск
NEAR_COUNTRIES = {'China', 'Russia', 'South Korea', 'North Korea', 'Taiwan', 'Mongolia'}

# именные острова: остаются при любом пороге отсева (рамки lon/lat)
WHITELIST = [
    (139.15, 34.20, 139.55, 34.90),   # Идзу-Осима, Тосима, Ниидзима, Кодзу
    (142.05, 26.50, 142.35, 27.15),   # Огасавара: Титидзима, Хахадзима
    (141.25, 24.70, 141.35, 24.85),   # Иото
    (136.10, 24.20, 136.30, 24.40),   # Окиноторишима
    (153.90, 24.20, 154.10, 24.40),   # Минамиторисима
    (131.80, 25.75, 132.10, 26.10),   # Дайто: Минамидайто, Китадайто
    (132.26, 34.22, 132.35, 34.32),   # Миядзима (Ицукусима), Хацукаити
]

# --- топологический конвейер ---
# реестр дуг: ключ 'f'/'r' + hash последовательности вершин.
# Дуга опознаётся по полному содержимому: общие границы у стран имеют
# идентичные последовательности вершин (прямо или в обратном ходе).
# Сопоставление по парам узлов/средней вершине небезопасно в глобальном
# графе: у далёких стран бывают совпадающие отдельные вершины.
arc_ids_by_key = {}


def chaikin(c):
    """Один проход Чейкина по открытой линии, концы фиксируются."""
    out = [c[0]]
    for a, b in zip(c[:-1], c[1:]):
        out.append((0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]))
        out.append((0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]))
    out.append(c[-1])
    return out


def clean(c):
    """Округление до 4 знаков + удаление подряд идущих дублей."""
    out = []
    for x, y in c:
        p = (round(x, 4), round(y, 4))
        if not out or out[-1] != p:
            out.append(p)
    return out


def dedupe(c):
    out = [c[0]]
    for p in c[1:]:
        if p != out[-1]:
            out.append(p)
    return out


def smooth_closed(coords, iters, post_tol):
    """Замкнутое кольцо (остров): циклический Чейкин + доупрощение.
    Мелким кольцам хватает одной итерации."""
    pts = coords[:-1] if coords[0] == coords[-1] else list(coords)
    if len(pts) <= 3:
        return list(coords) + [coords[0]]
    it = iters if len(pts) > 60 else min(1, iters)
    p = pts
    for _ in range(it):
        out = []
        n = len(p)
        for i in range(n):
            a = p[i]
            b = p[(i + 1) % n]
            out.append((0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]))
            out.append((0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]))
        p = out
    if len(p) >= 8:
        p = list(LineString(p + [p[0]]).simplify(post_tol, preserve_topology=True).coords)
    if p[0] != p[-1]:
        p.append(p[0])
    return p


def ring_in_whitelist(ext):
    xmin = min(p[0] for p in ext)
    xmax = max(p[0] for p in ext)
    ymin = min(p[1] for p in ext)
    ymax = max(p[1] for p in ext)
    return any(not (xmax < b[0] or xmin > b[2] or ymax < b[1] or ymin > b[3])
               for b in WHITELIST)


def extract_arcs(all_geoms, tols, iters, post_min=0.001, names=None, min_island_km2=30):
    """Топологическая сборка: общие дуги упрощаются и сглаживаются один раз,
    полигоны пересобираются из общих дуг. tols - допуск для каждой геометрии."""
    rings = []
    orig_rings = {}
    arc_owner = {}
    segs = set()

    def add_ring(gi, pi, ri, coords):
        pts = coords[:-1] if coords[0] == coords[-1] else list(coords)
        rings.append((gi, pi, ri, pts))
        orig_rings[(gi, pi, ri)] = pts
        for i in range(len(pts)):
            a = pts[i]
            b = pts[(i + 1) % len(pts)]
            segs.add((a, b) if a <= b else (b, a))

    for gi, g in enumerate(all_geoms):
        polys_g = g.geoms if g.geom_type == 'MultiPolygon' else [g]
        for pi, poly in enumerate(polys_g):
            add_ring(gi, pi, 0, list(poly.exterior.coords))
            for ri, hole in enumerate(poly.interiors, start=1):
                add_ring(gi, pi, ri, list(hole.coords))

    # узлы = вершины с числом инцидентных рёбер != 2 (стыки границ)
    degree = defaultdict(set)
    for a, b in segs:
        degree[a].add((a, b))
        degree[b].add((a, b))
    nodes = {v for v, ds in degree.items() if len(ds) != 2}

    arcs = {}
    arc_owner = {}
    ring_arcs = defaultdict(list)

    def lookup_arc(chain, gi):
        t = tuple(chain)
        fk = ('f', hash(t))
        rk = ('r', hash(t[::-1]))
        if fk in arc_ids_by_key:
            return arc_ids_by_key[fk], True
        if rk in arc_ids_by_key:
            return arc_ids_by_key[rk], False
        aid = len(arcs)
        arc_ids_by_key[fk] = aid
        arcs[aid] = chain
        arc_owner[aid] = gi
        return aid, True

    # каждое кольцо режем на дуги между узлами; кольца без узлов - одна дуга
    for gi, pi, ri, pts in rings:
        n = len(pts)
        node_pos = [i for i, v in enumerate(pts) if v in nodes]
        if not node_pos:
            aid = len(arcs)
            arc_owner[aid] = gi
            arcs[aid] = pts + [pts[0]]
            ring_arcs[(gi, pi, ri)].append((aid, True))
            continue
        for idx, start in enumerate(node_pos):
            end = node_pos[(idx + 1) % len(node_pos)]
            steps = (end - start) % n
            chain = [pts[(start + i) % n] for i in range(steps)] + [pts[end]]
            aid, forward = lookup_arc(chain, gi)
            ring_arcs[(gi, pi, ri)].append((aid, forward))

    # упрощаем и сглаживаем каждую дугу один раз
    new_arcs = {}
    for aid, coords in arcs.items():
        tol = tols[arc_owner[aid]]
        post_tol = max(tol * 0.4, 0.001)
        # грубым дугам хватает меньшего числа итераций сглаживания
        it = iters if tol <= 0.01 else max(1, iters - 1)
        if coords[0] == coords[-1]:
            new_arcs[aid] = clean(smooth_closed(coords, it, post_tol)) if it else clean(coords)
            continue
        if len(coords) <= 3:
            new_arcs[aid] = clean(coords)
            continue
        cl = list(LineString(coords).simplify(tol, preserve_topology=True).coords)
        if cl[0] != coords[0]:
            cl[0] = coords[0]
        if cl[-1] != coords[-1]:
            cl[-1] = coords[-1]
        if it:
            cl = chaikin(cl)
            for _ in range(it - 1):
                cl = chaikin(cl)
            cl = list(LineString(cl).simplify(post_tol, preserve_topology=True).coords)
            if cl[0] != coords[0]:
                cl[0] = coords[0]
            if cl[-1] != coords[-1]:
                cl[-1] = coords[-1]
        new_arcs[aid] = clean(dedupe(cl))

    # пересобираем кольца из общих дуг
    rebuilt = defaultdict(dict)
    for gi, pi, ri, pts in rings:
        out = []
        for aid, forward in ring_arcs[(gi, pi, ri)]:
            c = new_arcs[aid] if forward else new_arcs[aid][::-1]
            if out and out[-1] == c[0]:
                out.extend(c[1:])
            else:
                out.extend(c)
        if out[0] != out[-1]:
            out.append(out[0])
        rebuilt[(gi, pi)][ri] = out

    # подтягиваем грубые дуги дальнего мира к детальным дугам соседей:
    # в NE50m одна и та же граница у Китая и, например, Вьетнама задана
    # разными последовательностями вершин (совпадают только узлы), поэтому
    # на мелком зуме граница рисуется дважды. Дуги с совпадающими концами
    # и близкой геометрией схлопываются: ближняя к соседям - на детальную
    # версию, остальные - на неё же (одна линия на одну границу).
    near_index = defaultdict(list)
    for aid2, owner in arc_owner.items():
        if tols[owner] <= 0.01:
            c = arcs[aid2]
            near_index[tuple(sorted((c[0], c[-1])))].append(aid2)
    groups = defaultdict(list)
    for aid2, owner in arc_owner.items():
        c = arcs[aid2]
        groups[tuple(sorted((c[0], c[-1])))].append(aid2)
    replaced = 0
    from shapely.geometry import Point
    sample_ts = (0.1, 0.25, 0.5, 0.75, 0.9)
    for key, group in groups.items():
        if len(group) < 2:
            continue
        near_ids = [a for a in group if tols[arc_owner[a]] <= 0.01]
        if near_ids:
            # есть детальная версия - она эталон, допускаем отклонение до ~20 км
            canonical = near_ids[0]
            canonical_line = LineString(new_arcs[canonical])
            max_dist = 0.2
        else:
            # грубые версии границы между дальними странами
            canonical = min(group, key=lambda a: arcs[a].__len__())
            canonical_line = LineString(new_arcs[canonical])
            max_dist = 0.3
        for aid2 in group:
            if aid2 == canonical:
                continue
            if len(arcs[aid2]) < 2:
                continue
            other = LineString(arcs[aid2])
            close = all(
                canonical_line.distance(other.interpolate(t, normalized=True)) <= max_dist
                for t in sample_ts
            )
            if not close:
                continue  # это другая дуга (берег с теми же концами)
            nc = new_arcs[canonical]
            c = arcs[aid2]
            r4 = lambda p: (round(p[0], 4), round(p[1], 4))
            if nc[0] == r4(c[0]):
                new_arcs[aid2] = nc
            elif nc[0] == r4(c[-1]):
                new_arcs[aid2] = nc[::-1]
            else:
                continue
            replaced += 1
    if replaced:
        print(f'  дуг-дубликатов дальнего мира схлопнуто: {replaced}')

    if os.environ.get('DEBUG_ARC_SEQ'):
        with open(os.environ['DEBUG_ARC_SEQ'], 'w') as fh:
            for key, seq in sorted(ring_arcs.items()):
                fh.write(f'{key} {names[key[0]] if names else ""}: '
                         + ' '.join(f'{a}{"F" if f else "R"}' for a, f in seq) + '\n')

    # финализация: порезка мелких островов, починка невалидных колец
    geoms = []
    dropped = 0
    used_aids = set()
    for gi, g in enumerate(all_geoms):
        polys_g = g.geoms if g.geom_type == 'MultiPolygon' else [g]
        far = tols[gi] > 0.03
        # дальний мир: режем микроваленья (< ~60 км2), Япония и соседи - по порогу
        keep_min = 0.005 if far else max(min_island_km2 * 1e-4, 1e-7)
        polys = []
        for pi, poly in enumerate(polys_g):
            part_kept = False
            ext = rebuilt[(gi, pi)][0]
            if len(ext) < 4:
                ext = None
            holes = [h for ri in range(1, len(rebuilt[(gi, pi)]))
                     if (h := rebuilt[(gi, pi)].get(ri)) and len(h) >= 4]
            p = None
            if ext:
                p = Polygon(ext, holes)
                if not p.is_valid:
                    import os as _os
                    if _os.environ.get('DEBUG_RINGS'):
                        from shapely.validation import explain_validity
                        print(f'  [debug] {names[gi]} part {pi}: {explain_validity(p)}')
                    p = p.buffer(0)
                    # buffer(0) раздувает число точек - сгущение убираем
                    p = p.simplify(max(tols[gi] * 0.5, 0.001), preserve_topology=True)
                if p.is_empty:
                    p = None
            if p is None:
                # страховка: кольцо собралось кривым -> сглаживаем его независимо
                oc = orig_rings.get((gi, pi, 0))
                if not oc:
                    dropped += 1
                    continue
                cl = list(LineString(oc + [oc[0]]).simplify(tols[gi], preserve_topology=True).coords)
                for _ in range(max(1, iters)):
                    cl = chaikin(cl)
                cl = list(LineString(cl).simplify(max(tols[gi] * 0.4, 0.001), preserve_topology=True).coords)
                p = Polygon(dedupe(cl), holes)
                if not p.is_valid:
                    p = p.buffer(0).simplify(max(tols[gi] * 0.5, 0.001), preserve_topology=True)
                if p.is_empty:
                    dropped += 1
                    continue

            def keep_island(pp):
                if pp.area >= keep_min:
                    return True
                # при активном пороге именные острова остаются в любом случае
                return (not far and min_island_km2 > 0
                        and ring_in_whitelist(list(pp.exterior.coords)))

            if p.geom_type == 'MultiPolygon':
                kept = [pp for pp in p.geoms if keep_island(pp)]
                dropped += len(p.geoms) - len(kept)
                polys.extend(kept)
                part_kept = True
            elif keep_island(p):
                polys.append(p)
                part_kept = True
            else:
                dropped += 1
            if part_kept:
                # в обводки попадают дуги только оставшихся полигонов,
                # дуги выброшенных островов не нужны (контуры-призраки)
                for ri in range(len(rebuilt[(gi, pi)])):
                    used_aids.update(a for a, _ in ring_arcs[(gi, pi, ri)])
        if polys:
            geoms.append(MultiPolygon(polys))
    return geoms, dropped, new_arcs, used_aids


def rnd_coords(c):
    """Округление координат до 4 знаков (рекурсивно)."""
    if isinstance(c[0], (int, float)):
        return [round(c[0], 4), round(c[1], 4)]
    return [rnd_coords(x) for x in c]


def process_all(features, tols, args):
    geoms = [shape(f['geometry']) for f in features]
    names = [f['properties'].get('nam') or f['properties'].get('NAME') for f in features]
    new_geoms, dropped, arcs, used_aids = extract_arcs(geoms, tols, args.smooth, names=names,
                                                       min_island_km2=args.min_island_km2)
    for i, (f, ng) in enumerate(zip(features, new_geoms)):
        g = shape(mapping(ng))  # координаты дуг уже округлены до 4 знаков
        if not g.is_valid:
            # buffer(0) чинит самокасания, но раздувает точки - снимаем сгущение
            fixed = g.buffer(0).simplify(0.01, preserve_topology=True)
            fixed = shape({'type': fixed.geom_type, 'coordinates': rnd_coords(mapping(fixed)['coordinates'])})
            g = fixed if fixed.is_valid and not fixed.is_empty else g.make_valid()
        f['geometry'] = mapping(g)
    border_feats = [
        {'type': 'Feature', 'properties': {'kind': 'border'},
         'geometry': {'type': 'LineString', 'coordinates': rnd_coords(arcs[aid])}}
        for aid in sorted(used_aids) if len(arcs[aid]) >= 2
    ]
    pts = sum(len(list(p.exterior.coords)) for g in new_geoms for p in g.geoms)
    print(f'  отброшено колец: {dropped}, точек по внешним контурам: {pts}, '
          f'дуг-обводок: {len(border_feats)}')
    return border_feats


def download_sources():
    import subprocess
    CACHE.mkdir(parents=True, exist_ok=True)
    for filename, (url, title) in SOURCES.items():
        target = CACHE / filename
        if target.exists() and target.stat().st_size > 0:
            continue
        print(f'скачиваю {title}...')
        # urllib падает на SSL-сертификатах питона с python.org - используем curl
        subprocess.run(['curl', '-sL', '-o', str(target), url], check=True)


def main():
    parser = argparse.ArgumentParser(
        description='Пересборка front/public/japan-prefectures.geojson')
    parser.add_argument('--tol-japan', type=float, default=0.005,
                        help='допуск упрощения Японии, градусы (default: 0.005)')
    parser.add_argument('--tol-near', type=float, default=0.008,
                        help='допуск стран-соседей, градусы (default: 0.008)')
    parser.add_argument('--tol-far', type=float, default=0.15,
                        help='допуск остального мира, градусы (default: 0.15)')
    parser.add_argument('--smooth', type=int, default=3,
                        help='итерации сглаживания Чейкина (default: 3)')
    parser.add_argument('--min-island-km2', type=float, default=30,
                        help='порог отсева мелких островов, км2 (default: 30; '
                             '0 - оставить все)')
    parser.add_argument('--clip', type=float, nargs=4,
                        default=[60, -12, 178, 62],
                        metavar=('WEST', 'SOUTH', 'EAST', 'NORTH'),
                        help='bbox обрезки материка с запасом за maxBounds '
                             '(default: 60 -12 178 62)')
    parser.add_argument('--snap-grid', type=int, default=2,
                        help='сетка снаппинга вершин дальнего мира к соседям, '
                             'знаков после запятой (default: 2 ~ 1 км; '
                             '0 - без снаппинга)')
    parser.add_argument('--out', type=Path, default=DEFAULT_OUT,
                        help='путь результата')
    args = parser.parse_args()

    download_sources()

    japan = json.load(open(CACHE / 'japan.geojson'))
    ne = json.load(open(CACHE / 'ne50.geojson'))

    near_feats = [f for f in ne['features'] if f['properties'].get('NAME') in NEAR_COUNTRIES]
    # Япония берётся из детального источника, из NE50 не нужна
    far_feats = [f for f in ne['features'] if f['properties'].get('NAME') != 'Japan']

    # материк режем по bbox с запасом за maxBounds карты: глубже драгать нельзя,
    # поэтому за пределами бокса суша просто не нужна - это экономит размер
    from shapely.geometry import box as shp_box
    clip = shp_box(*args.clip)
    kept_near = []
    for f in near_feats:
        g = shape(f['geometry']).intersection(clip)
        if g.is_empty or g.geom_type not in ('Polygon', 'MultiPolygon'):
            continue
        f['geometry'] = mapping(g)
        kept_near.append(f)
    kept_far = []
    for f in far_feats:
        g = shape(f['geometry']).intersection(clip)
        if g.is_empty or g.geom_type not in ('Polygon', 'MultiPolygon'):
            continue
        f['geometry'] = mapping(g)
        kept_far.append(f)
    near_feats, far_feats = kept_near, kept_far

    features = japan['features'] + near_feats + far_feats
    tols = ([args.tol_japan] * len(japan['features'])
            + [args.tol_near] * len(near_feats)
            + [args.tol_far] * len(far_feats))
    print(f'фич: {len(features)} (Япония {len(japan["features"])}, '
          f'соседи {len(near_feats)}, мир {len(far_feats)})')
    border_feats = process_all(features, tols, args)

    # финальное округление координат до 4 знаков (после buffer-починок
    # остаются длинные хвосты); если округление ломает геометрию - make_valid
    for f in features:
        f['geometry']['coordinates'] = rnd_coords(f['geometry']['coordinates'])
        g = shape(f['geometry'])
        if not g.is_valid:
            fixed = g.buffer(0)
            if not fixed.is_valid:
                fixed = g.make_valid()
            f['geometry'] = mapping(fixed)

    out = {'type': 'FeatureCollection', 'features': features}
    args.out.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')),
                        encoding='utf-8')
    size = args.out.stat().st_size
    print(f'готово: {args.out} ({round(size / 1e6, 2)} MB)')

    # обводки - отдельным файлом: каждая дуга рисуется один раз,
    # двойных линий на общих границах не бывает
    borders_out = args.out.with_name('japan-prefectures-borders.geojson')
    borders = {'type': 'FeatureCollection', 'features': border_feats}
    borders_out.write_text(json.dumps(borders, ensure_ascii=False, separators=(',', ':')),
                           encoding='utf-8')
    print(f'готово: {borders_out} '
          f'({round(borders_out.stat().st_size / 1e6, 2)} MB, {len(border_feats)} дуг)')


if __name__ == '__main__':
    sys.exit(main())
