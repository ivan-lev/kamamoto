import type { Exhibition } from '../types/exhibition';
import { model, Schema } from 'mongoose';

import { isURL } from 'validator';

const exhibitionSchema = new Schema<Exhibition>(
	{
		id: {
			type: Number,
			required: [true, 'Нужно указать id выставки'],
			unique: true,
		},

		year: {
			type: Number,
			required: [true, 'Нужно указать год проведени выставки'],
		},

		dates: {
			type: String,
			required: [true, 'Нужно указать даты начала и конца выставки'],
		},

		city: {
			type: String,
			required: [true, 'Нужно указать город, где была выставка'],
		},

		address: {
			type: String,
			required: [true, 'Нужно указать адрес, по которому проходила выставка'],
		},

		place: {
			type: String,
			required: [
				true,
				'Нужно указать название заведения, где проходила выставка',
			],
		},

		name: {
			type: String,
			required: [true, 'Нужно указать название выставки'],
		},

		link: {
			type: String,
			validate: {
				validator: (value: string) => isURL(value) || value.length === 0,
				message: 'Некорректный URL выставки',
			},
		},

		description: {
			type: String,
			required: [true, 'Нужно заполнить описание выставки'],
		},

		photos: {
			type: [
				{
					type: String,
				},
			],
			default: [],
		},

		poster: {
			type: String,
			default: '',
		},

		curators: {
			type: String,
		},

		organisators: {
			type: String,
		},

		isActive: {
			type: Boolean,
			required: [true, 'Нужно указать, показывать страницу или нет'],
		},
	},

	{ versionKey: false },
);

export default model<Exhibition>('exhibition', exhibitionSchema);
