import L from 'leaflet';

export interface Marker {
	geocode: L.LatLngExpression;
	tooltip: string;
	popup?: TrustedHTML;
}