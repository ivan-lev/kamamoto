import type { File } from '../types/file';

import { model, Schema } from 'mongoose';

const fileSchema = new Schema<File>(
	{
		id: {
			type: Number,
			required: [true, 'Нужно указать id файла'],
			unique: true,
		},

		name: {
			type: String,
			required: [true, 'Нужно указать название файла'],
		},

		thumbnail: {
			type: String,
			required: [true, 'Нужно указать название превью-файла'],
		},

		description: {
			type: String,
			required: [true, 'Нужно добавить описание к файлу'],
		},

		isActive: {
			type: Boolean,
			required: [true, 'Нужно указать активность файла'],
		},
	},
	{ versionKey: false },
);

export default model<File>('file', fileSchema);
