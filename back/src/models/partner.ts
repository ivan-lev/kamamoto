import type { Partner } from '../types/partner';
import { model, Schema } from 'mongoose';

import { isURL } from 'validator';

const partnerSchema = new Schema<Partner>(
	{
		title: {
			type: String,
			required: [true, 'Нужно указать название организации'],
		},

		link: {
			type: String,
			required: [true, 'Нужно указать ссылку на сайт организации'],
			validate: {
				validator: (value: string) => isURL(value),
				message: 'Некорректная ссылка',
			},
		},

		logo: {
			type: String,
			required: [true, 'Нужно указать название логотипа'],
		},

		isActive: {
			type: Boolean,
			required: [true, 'Нужно указать активность партнёра'],
		},
	},
	{ versionKey: false },
);

export default model<Partner>('partner', partnerSchema);
