import type { Category } from '../types/category';

import { model, Schema } from 'mongoose';

const categorySchema = new Schema<Category>(
  {
    category: {
      type: String,
      required: [true, 'Нужно указать название категории на латиннице'],
      unique: true,
    },

    title: {
      type: String,
      required: [true, 'Нужно указать название категории на русском'],
      unique: true,
    },

    thumbnail: {
      type: String,
      required: [true, 'Нужно указать ссылку на файл с картинкой'],
    },
  },
  { versionKey: false },
);

export default model<Category>('category', categorySchema);
