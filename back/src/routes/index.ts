import { Router } from 'express';
import { ERROR_MESSAGES } from '../constants';
import { login } from '../controllers/users';
import { NotFoundError } from '../errors/not-found-error';
import { auth } from '../middlewares/auth';
import { signInValidator } from '../middlewares/validators/userValidator';

import categoryRouter from './categories';
import exhibitionRouter from './exhibitions';
import exhibitRouter from './exhibits';
import lettersRouter from './letters';
import partnerRouter from './partners';
import statisticsRouter from './statistics';
import userRouter from './users';

const routes = Router();

routes.post('/signin', signInValidator, login);
routes.use(auth); // pass all get requests except of user token checking
routes.use('/users', userRouter);
routes.use('/exhibits', exhibitRouter);
routes.use('/exhibitions', exhibitionRouter);
routes.use('/categories', categoryRouter);
routes.use('/statistics', statisticsRouter);
routes.use('/partners', partnerRouter);
routes.use('/letters', lettersRouter);
routes.all('*', (req, res, next) => {
  return next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND));
});

export default routes;
