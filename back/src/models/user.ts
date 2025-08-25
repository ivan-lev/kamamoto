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
	findUserByCredentials: (email: string, password: string) => any;
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
			findUserByCredentials(email: string, password: string): any {
				return this.findOne({ email })
					.select('+password')
					.then(async (user: any) => {
						if (user.email === undefined) {
							throw new AuthorizationError(
								ERROR_MESSAGES.USER_WRONG_CREDENTIALS,
							);
						}
						return await bcrypt
							.compare(password, user.password as string)
							.then((matched: boolean) => {
								if (!matched) {
									throw new AuthorizationError(
										ERROR_MESSAGES.USER_WRONG_CREDENTIALS,
									);
								}
								return user;
							});
					});
			},
		},
		versionKey: 'false',
	},
);

export default model<UserDocument, UserModel>('user', userSchema);
