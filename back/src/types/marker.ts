import type { Types } from 'mongoose';

export interface Marker {
	_id: Types.ObjectId;
	geocode: [number, number];
	title: string;
	kanji?: string;
	romaji?: string;
	info?: string;
	image?: string;
	isActive: boolean;
	groupName: string;
};

export type PublicMarker = Omit<Marker, '_id' | 'isActive' | 'groupName'>;

export interface MarkerGroup {
	groupName: string;
	markers: PublicMarker[];
}
