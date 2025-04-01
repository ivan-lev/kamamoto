import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { isEmail } from 'validator';

import { ERROR_MESSAGES } from '../constants';
import { AuthorizationError } from '../errors/authorization-error';

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
    versionKey: false,
  },
);

// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email })
//     .select("+password")
//     .then((user: any) => {
//       if (!user) {
//         throw new AuthorizationError(ERROR_MESSAGES.USER_WRONG_CREDENTIALS);
//       }
//       return bcrypt
//         .compare(password, user.password)
//         .then((matched: boolean) => {
//           if (!matched) {
//             throw new AuthorizationError(ERROR_MESSAGES.USER_WRONG_CREDENTIALS);
//           }
//           return user;
//         });
//     });
// };

export default model('user', userSchema);
