import type { Meibutsu } from '../types/meibutsu';
import { model, Schema } from 'mongoose';

const meibutsuSchema = new Schema<Meibutsu>(
	{
		id: {
			type: String,
			required: [true, 'Нужно указать уникальное имя на латинице'],
			unique: true,
		},

		name: {
			type: String,
			required: [true, 'Нужно указать название вещи'],
			unique: true,
		},

		japaneseName: {
			type: String,
		},

		photo: {
			type: String,
		},

		info: {
			type: String,
		},

		showArticle: {
			type: Boolean,
			default: false,
		},

		article: {
			type: [
				{
					_id: false,
					content: String,
					slides: [
						{
							_id: false,
							filename: String,
							source: String,
							caption: String,
						},
					],
				},
			],
			default: [],
		},
	},
	{ versionKey: false },
);

export default model<Meibutsu>('meibutsu', meibutsuSchema);
