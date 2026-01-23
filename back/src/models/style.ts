import type { Style } from '../types/style';

import { model, Schema } from 'mongoose';

const styleSchema = new Schema<Style>(
	{
		name: {
			type: String,
			required: [true, 'Нужно указать название категории на латиннице'],
			unique: true,
		},

		title: {
			type: String,
			required: [true, 'Нужно указать название категории на русском'],
			unique: true,
		},

		brief: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		showArticle: {
			type: Boolean,
			default: false,
		},
		thumbnail: {
			type: String,
			default: '',
		},
		images: {
			type: [String],
			default: [],
		},
		additionalImages: {
			type: [String],
			default: [],
		},
		mapImage: {
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

export default model<Style>('style', styleSchema);
