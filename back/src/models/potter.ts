import type { Potter } from '../types/potter';
import { model, Schema } from 'mongoose';

const potterSchema = new Schema<Potter>(
	{
		id: {
			type: String,
			required: [true, 'Нужно указать книепльное имя на латиннице'],
			unique: true,
		},

		name: {
			type: String,
			required: [true, 'Нужно указать имя гончара'],
			unique: true,
		},

		japaneseName: {
			type: String,
		},

		lifeDates: {
			type: String,
		},

		photo: {
			type: String,
		},

		info: {
			type: String,
		},

		isLNT: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ versionKey: false },
);

export default model<Potter>('potter', potterSchema);
