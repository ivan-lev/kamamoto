import type L from 'leaflet';

export interface Marker {
	geocode: L.LatLngExpression;
	tooltip: string;
	kanji: string;
	romaji: string;
	popup: TrustedHTML;
	image: string;
}
