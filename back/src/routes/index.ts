import { Router } from 'express';
import { login } from '../controllers/users';
import { NotFoundError } from '../errors/not-found-error';
import { auth } from '../middlewares/auth';
import { signInValidator } from '../middlewares/validators/userValidator';
import { ERROR_MESSAGES } from '../variables/messages';

import categoryRouter from './categories';
import ceramicStylesRouter from './ceramicStyles';
import complectationRouter from './complectation';
import exhibitionRouter from './exhibitions';
import exhibitRouter from './exhibits';
import lettersRouter from './letters';
import partnerRouter from './partners';
import potterRouter from './potters';
import statisticsRouter from './statistics';
import userRouter from './users';

const routes = Router();

routes.post('/signin', signInValidator, login);
routes.use(auth); // pass all get requests except of user token checking
routes.use('/ceramic-styles', ceramicStylesRouter);
routes.use('/users', userRouter);
routes.use('/exhibits', exhibitRouter);
routes.use('/exhibitions', exhibitionRouter);
routes.use('/categories', categoryRouter);
routes.use('/statistics', statisticsRouter);
routes.use('/partners', partnerRouter);
routes.use('/potters', potterRouter);
routes.use('/letters', lettersRouter);
routes.use('/files', lettersRouter);
routes.use('/complectation', complectationRouter);
routes.all('*splat', (req, res, next) => {
	return next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND));
});

export default routes;
