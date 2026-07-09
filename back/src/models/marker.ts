import type { Marker } from '../types/marker';
import { model, Schema } from 'mongoose';

const markerSchema = new Schema<Marker>(
	{
		geocode: {
			type: [Number],
			required: [true, 'Нужно указать координаты маркера'],
		},

		title: {
			type: String,
			required: [true, 'Нужно указать название маркера'],
		},

		kanji: {
			type: String,
		},

		romaji: {
			type: String,
		},

		info: {
			type: String,
		},

		image: {
			type: String,
		},

		isActive: {
			type: Boolean,
			default: false,
		},

		groupName: {
			type: String,
			required: [true, 'Нужно указать группу маркера'],
		},
	},
	{ versionKey: false },
);

export default model<Marker>('marker', markerSchema);
