import L from 'leaflet';
// components/visitor/Map/JapanGeoJSON.tsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface JapanGeoJSONProps {
	url?: string;
	fillColor?: string;
	fillOpacity?: number;
	borderColor?: string;
	weight?: number;
}

// кэш на уровне модуля: при перемонтировании карты повторной загрузки не будет
const cache = new Map<string, Promise<unknown>>();

function loadGeoJSON(url: string) {
	let promise = cache.get(url);

	if (!promise) {
		promise = fetch(url).then(response => response.json());
		cache.set(url, promise);
	}

	return promise;
}

// тайл паттерна океана = один период SVG-паттерна (306px, см. размеры svg).
// background-size должен совпадать с .ocean-pattern-tile в styles/leaflet-map.scss
const PATTERN_TILE_SIZE = 306;

// слой паттерна океана на базе GridLayer: тайлы живут в tilePane и участвуют
// в zoom-анимации, поэтому волны не «отъезжают» от суши при смене зума
// (в отличие от background на контейнере, который масштабировать нельзя)
class OceanPatternLayer extends L.GridLayer {
	override createTile(): HTMLElement {
		return L.DomUtil.create('div', 'ocean-pattern-tile');
	}
}

export default function JapanGeoJSON({
	url = '/japan-prefectures.geojson',
	fillColor = '#363433',
	fillOpacity = 1,
	borderColor = '#a69e9a',
	weight = 1,
}: JapanGeoJSONProps) {
	const map = useMap();

	useEffect(() => {
		const oceanLayer = new OceanPatternLayer({ tileSize: PATTERN_TILE_SIZE }).addTo(map);

		let fillLayer: L.GeoJSON | undefined;
		let strokeLayer: L.GeoJSON | undefined;
		let cancelled = false;

		// canvas-рендер: в файле десятки тысяч точек, SVG с ними заметно лагает
		const renderer = L.canvas({ padding: 0.3 });

		loadGeoJSON(url)
			.then((data) => {
				if (cancelled)
					return;

				const collection = data as GeoJSON.FeatureCollection;

				// заливки — c обводкой weight 1.5: она перекрывает волосяные щели
				// между соседями; тонкие дуги-границы ложатся отдельным слоем.
				// ?v= - сброс кэша браузера при пересборке файлов
				fillLayer = L.geoJSON(
					collection as GeoJSON.GeoJsonObject,
					{ style: { fillColor, fillOpacity, color: borderColor, weight: 1.5, renderer }, interactive: false },
				).addTo(map);

				return loadGeoJSON('/japan-prefectures-borders.geojson?v=3');
			})
			.then((data) => {
				if (cancelled)
					return;

				// обводки отдельным слоем поверх заливок: при топологически точной
				// сборке заливка соседа перекрывает обводку, и границы пропадают.
				// В файле обводок - уникальные дуги, каждая граница рисуется один раз
				strokeLayer = L.geoJSON(
					data as GeoJSON.GeoJsonObject,
					{ style: { color: borderColor, weight, fill: false, renderer }, interactive: false },
				).addTo(map);
			})
			.catch(error => console.error(error));

		return () => {
			cancelled = true;
			map.removeLayer(oceanLayer);
			if (strokeLayer)
				map.removeLayer(strokeLayer);
			if (fillLayer)
				map.removeLayer(fillLayer);
		};
	}, [map, url, fillColor, fillOpacity, borderColor, weight]);

	return null;
}
