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
			required: [true, 'Нужно указать ссылку на файл с картинкой'],
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
	},
	{ versionKey: false },
);

export default model<Style>('style', styleSchema);
