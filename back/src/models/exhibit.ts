import type { Exhibit } from '../types/exhibit';
import { model, Schema } from 'mongoose';

// import { isURL } from 'validator';

const exhibitSchema = new Schema<Exhibit>(
	{
		id: {
			type: Number,
			required: [true, 'Нужно указать номер экспоната'],
			unique: true,
		},

		name: {
			type: String,
			required: [true, 'Нужно указать название экспоната'],
		},

		age: {
			type: String,
		},

		category: {
			type: Schema.Types.ObjectId,
			ref: 'category',
			default: '66c7346ebc34b51d2a432a8d',
		},

		images: {
			type: [String],
			required: [true, 'Нужно написать названия файлов'],
		},

		additionalImages: {
			type: [String],
		},

		thumbnail: {
			type: String,
			required: [true, 'Нужно выбрать превьюшку'],
			default: 'thumb.jpg',
		},

		style: {
			type: Schema.Types.ObjectId,
			ref: 'style',
			default: '67f8082ad7087fa1cababada',
			required: [true, 'Нужно выбрать стиль керамики'],
			// validate: {
			//   validator: (value: string) =>
			//     Object.values(CeramicStyleType).includes(value as CeramicStyleType),
			//   message: "Некорректная категория керамики",
			// },
		},

		potterName: {
			type: String,
		},

		potterJapaneseName: {
			type: String,
		},

		potterLifeDates: {
			type: String,
		},

		potterPhoto: {
			type: String,
			// validate: {
			// 	validator: (value: string) => isURL(value),
			// 	message: 'Некорректный URL фотографии',
			// },
		},

		potterInfo: {
			type: String,
		},

		description: {
			type: String,
			default: 'Описание в процессе создания',
		},

		additionalDescription: {
			type: String,
		},

		price: {
			type: Number,
			min: [0, 'Дешевле не бывает'],
			default: 0,
		},

		weight: {
			type: Number,
			// required: [true, "Взвесь предмет"],
		},

		height: {
			type: Number,
			// required: [true, "Нужно указать высоту предмета"],
		},

		length: {
			type: Number,
			// required: [true, "Нужно указать высоту предмета"],
		},

		width: {
			type: Number,
			// required: [true, "Нужно указать высоту предмета"],
		},

		diameter: { type: Number },
		footDiameter: { type: Number },
		volume: { type: Number },
		weightOfSet: { type: Number },
		complectation: { type: [String] },
		preservation: { type: String },

		isActive: { type: Boolean, default: false },
	},
	{ versionKey: false },
);

export default model<Exhibit>('exhibit', exhibitSchema);
