import type { Feature } from '../types/feature';

import { model, Schema } from 'mongoose';

const featureSchema = new Schema<Feature>(
	{
		name: {
			type: String,
			required: [true, 'Нужно указать название фичи на латиннице'],
			unique: true,
		},

		title: {
			type: String,
			required: [true, 'Нужно указать название фичи на русском'],
			unique: true,
		},

		showArticle: {
			type: Boolean,
			default: false,
		},

		thumbnail: {
			type: String,
			default: '',
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

export default model<Feature>('feature', featureSchema);
