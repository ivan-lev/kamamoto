import type { File } from '../types/file';

import { model, Schema } from 'mongoose';

const letterSchema = new Schema<File>(
  {
    id: {
      type: Number,
      required: [true, 'Нужно указать id письма'],
      unique: true,
    },

    name: {
      type: String,
      required: [true, 'Нужно указать название файла'],
    },

    preview: {
      type: String,
      required: [true, 'Нужно указать название превью-файла'],
    },

    description: {
      type: String,
      required: [true, 'Нужно добавить описание к письму'],
    },

    isActive: {
      type: Boolean,
      required: [true, 'Нужно указать активность партнёра'],
    },
  },
  { versionKey: false },
);

export default model<File>('letter', letterSchema);
