import { Router } from 'express';
import { term } from '../controllers/terms';
import { termIdValidator, termValidator } from '../middlewares/validators/termValidator';

const termRouter = Router();

termRouter.get('/', term.getTerms);
termRouter.post('/', termValidator, term.createTerm);
termRouter.patch('/:id', termIdValidator, termValidator, term.updateTerm);
termRouter.delete('/:id', termIdValidator, term.deleteTerm);

export default termRouter;
