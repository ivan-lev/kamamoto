import type L from 'leaflet';

export interface Marker {
	geocode: L.LatLngExpression;
	title: string;
	kanji: string;
	romaji: string;
	info: TrustedHTML;
	image: string;
}

export interface MarkerGroup {
	groupName: string;
	markers: Marker[];
}
