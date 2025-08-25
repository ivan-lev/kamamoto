import type { Complectation } from '../types/complectation';
import { model, Schema } from 'mongoose';

const complectationSchema = new Schema<Complectation>(
	{
		name: {
			type: String,
			required: [true, 'Нужно указать уникальное поле для базы данных'],
			unique: true,
		},

		title: {
			type: String,
			required: [true, 'Нужно указать название'],
		},
	},

	{ versionKey: false },
);

export default model<Complectation>('complectation', complectationSchema);
