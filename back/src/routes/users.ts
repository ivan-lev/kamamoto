import { Router } from 'express';
import { checkToken } from '../controllers/users';

const userRouter = Router();

userRouter.get('/', checkToken);

export default userRouter;
