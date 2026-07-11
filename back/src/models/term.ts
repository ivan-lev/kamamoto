import type { Term } from '../types/term';
import { model, Schema } from 'mongoose';

const termSchema = new Schema<Term>(
	{
		id: {
			type: String,
			required: [true, 'Нужно указать уникальный id термина на латиннице'],
			unique: true,
		},

		title: {
			type: String,
			required: [true, 'Нужно указать название термина'],
		},

		kanji: {
			type: String,
			default: '',
		},

		romaji: {
			type: String,
			default: '',
		},

		image: {
			type: String,
			default: '',
		},

		definition: {
			type: String,
			required: [true, 'Нужно указать определение термина'],
		},

		letter: {
			type: String,
			required: [true, 'Нужно указать букву, к которой относится термин'],
		},
	},
	{ versionKey: false },
);

export default model<Term>('term', termSchema);
