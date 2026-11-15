import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import citiesData from './map-cities.json';
import prefecturesData from './map-prefectures.json';

interface MapPoint {
	kind: string;
	id?: number;
	name?: string;
	name_ja?: string;
	name_ru?: string;
	lat: number;
	lng: number;
	zoom?: number; // индивидуальный порог зума, перекрывает ZOOM_FROM
}

// зум, с которого появляется каждый тип точки - настраивается здесь
const ZOOM_FROM: Record<string, number> = {
	capital: 5,
	prefecture: 8,
	city: 9,
};

// база - ручной файл map-prefectures.json (координаты и подписи правятся в нём);
// кастомные города добавляются из map-cities.json
const points: MapPoint[] = [
	...(prefecturesData as MapPoint[]),
	...(citiesData as Omit<MapPoint, 'kind'>[]).map(c => ({ kind: 'city', ...c })),
];

export default function MapPoints() {
	const map = useMap();

	useEffect(() => {
		let layer: L.LayerGroup | undefined;

		const rebuild = () => {
			if (!layer)
				return;
			layer.clearLayers();
			const zoom = map.getZoom();

			for (const p of points) {
				if (zoom < (p.zoom ?? ZOOM_FROM[p.kind] ?? 7))
					continue;

				if (p.kind === 'prefecture') {
					// подпись названия префектуры: смещение текста относительно
					// точки правится в css (.map-label__text -> transform)
					L.marker([p.lat, p.lng], {
						icon: L.divIcon({
							className: 'map-label map-label--prefecture',
							html: `<span class="map-label__text">${p.name_ru || p.name_ja || ''}</span>`,
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
					const dotSize = p.kind === 'capital' ? 12 : 8;

					L.marker([p.lat, p.lng], {
						icon: L.divIcon({
							className: `map-label map-label--${p.kind}`,
							html: `<i class="map-label__dot"></i><span class="map-label__text">${p.name_ru || p.name || ''}</span>`,
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
	}, [map]);

	return null;
}
