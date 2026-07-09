import { MARKER_GROUPS } from '@/components/visitor/Map/markerGroups';

export interface Marker {
	_id: string;
	geocode: [number, number];
	title: string;
	kanji: string;
	romaji: string;
	info: string;
	image: string;
	isActive: boolean;
	groupName: string;
}

export const defaultMarker: Marker = {
	_id: '',
	geocode: [0, 0],
	title: '',
	kanji: '',
	romaji: '',
	info: '',
	image: '',
	isActive: false,
	groupName: MARKER_GROUPS[0].groupName,
};
