import type { Document, Model } from 'mongoose';
import type { User } from '../types/user';
import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { isEmail } from 'validator';

import { AuthorizationError } from '../errors/authorization-error';
import { ERROR_MESSAGES } from '../variables/messages';

export interface UserDocument extends User, Document {
}

interface UserModel extends Model<UserDocument> {
	findUserByCredentials: (email: string, password: string) => Promise<UserDocument>;
}

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Поле email должно быть заполнено'],
			unique: [true, 'Этот адрес почты уже используется'],
			validate: {
				validator: (value: string) => isEmail(value),
				message: 'Некорректный email',
			},
		},

		password: {
			type: String,
			required: [true, 'Поле password должно быть заполнено'],
			select: false,
		},
	},
	{
		statics: {
			async findUserByCredentials(email: string, password: string): Promise<UserDocument> {
				const user = await this.findOne({ email }).select('+password');
				// одинаковый ответ на неверную почту и неверный пароль: не подсказываем, какие адреса есть в базе
				if (!user || !(await bcrypt.compare(password, user.password as string)))
					throw new AuthorizationError(ERROR_MESSAGES.USER.WRONG_CREDENTIALS);

				return user;
			},
		},
		versionKey: 'false',
	},
);

export default model<UserDocument, UserModel>('user', userSchema);
