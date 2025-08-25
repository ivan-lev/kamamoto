import { Router } from 'express';
import { complectation } from '../controllers/complectation';
import { complectationCreateValidator } from '../middlewares/validators/complectationValidator';

const exhibitionRouter = Router();

exhibitionRouter.get('/', complectation.getComplectations);
exhibitionRouter.post('/', complectationCreateValidator, complectation.createComplectation);

export default exhibitionRouter;
