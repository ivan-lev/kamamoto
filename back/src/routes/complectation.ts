import { Router } from 'express';
import { complectation } from '../controllers/complectation';
import { complectationNameValidator, complectationValidator } from '../middlewares/validators/complectationValidator';

const complectationRouter = Router();

complectationRouter.get('/', complectation.getComplectations);
complectationRouter.post('/', complectationValidator, complectation.createComplectation);
complectationRouter.patch('/:id', complectationValidator, complectation.updateComplectation);
complectationRouter.delete('/:name', complectationNameValidator, complectation.deleteComplectation);

export default complectationRouter;
