import type { MarkerGroup } from '@/components/visitor/Map/map.types';
import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';

interface MapPoint {
	kind: string;
	title: string;
	kanji?: string;
	romaji?: string;
	geocode: [number, number];
}

// зум, с которого появляется каждый тип точки - настраивается здесь
const ZOOM_FROM: Record<string, number> = {
	capital: 5,
	prefecture: 8,
	city: 9,
};

const POINT_GROUP_NAMES = ['capital', 'prefecture', 'city'] as const;

interface Props {
	// группы маркеров, уже загруженные Map.tsx из GET /maps/groups
	groups: MarkerGroup[];
}

// точки карты (подписи префектур, столицы, города) хранятся в БД
// в тех же marker-документах, что и маркеры слоёв, но в сервисных
// groupName-группах (см. POINT_GROUP_NAMES); соответствие полей:
// title <- name_ru, kanji <- name_ja, romaji <- name, geocode <- [lat, lng]
function getPoints(groups: MarkerGroup[]): MapPoint[] {
	const points: MapPoint[] = [];

	for (const group of groups) {
		if (!POINT_GROUP_NAMES.includes(group.groupName as (typeof POINT_GROUP_NAMES)[number]))
			continue;

		for (const marker of group.markers) {
			points.push({
				kind: group.groupName,
				title: marker.title,
				kanji: marker.kanji,
				romaji: marker.romaji,
				geocode: marker.geocode as [number, number],
			});
		}
	}

	return points;
}

export default function MapPoints({ groups }: Props) {
	const map = useMap();

	const points = useMemo(() => getPoints(groups), [groups]);

	useEffect(() => {
		let layer: L.LayerGroup | undefined;

		const rebuild = () => {
			if (!layer)
				return;
			layer.clearLayers();
			const zoom = map.getZoom();

			for (const p of points) {
				if (zoom < (ZOOM_FROM[p.kind] ?? 7))
					continue;

				if (p.kind === 'prefecture') {
					// подпись названия префектуры: смещение текста относительно
					// точки правится в css (.map-label__text -> transform)
					L.marker(p.geocode, {
						icon: L.divIcon({
							className: 'map-label map-label--prefecture',
							html: `<span class="map-label__text">${p.title || p.kanji || ''}</span>`,
							iconSize: [12, 12], // якорь - центр бокса: текст центрируется в координате
						}),
						interactive: false,
						keyboard: false,
					}).addTo(layer);
				}
				else {
					// столица и города - точка с постоянным названием рядом:
					// позиция текста относительно точки правится в css
					// (.map-label__text -> transform)
					// iconSize = размеру точки: якорь (центр бокса) совпадает
					// с центром точки, и она не съезжает с координаты
					const dotSize = p.kind === 'capital'
						? 12
						: 8;

					L.marker(p.geocode, {
						icon: L.divIcon({
							className: `map-label map-label--${p.kind}`,
							html: `<i class="map-label__dot"></i><span class="map-label__text">${p.title || p.romaji || ''}</span>`,
							iconSize: [dotSize, dotSize],
						}),
					}).addTo(layer);
				}
			}
		};

		layer = L.layerGroup().addTo(map);
		rebuild();
		map.on('zoomend', rebuild);

		return () => {
			map.off('zoomend', rebuild);
			if (layer)
				map.removeLayer(layer);
		};
	}, [map, points]);

	return null;
}
