import { Router } from 'express';
import { checkToken } from '../controllers/users';
import { requireAuth } from '../middlewares/auth';

const userRouter = Router();

userRouter.get('/', requireAuth, checkToken);

export default userRouter;
