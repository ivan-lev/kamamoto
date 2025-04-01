import { Router } from 'express';
import { letters } from '../controllers/letters';
import { fileDeleteValidator, fileValidator } from '../middlewares/validators/fileValidator';

const letterRouter = Router();

letterRouter.get('/', letters.getLetters);
letterRouter.post('/', fileValidator, letters.createLetter);
letterRouter.patch('/:id', fileValidator, letters.updateLetter);
letterRouter.delete('/:id', fileDeleteValidator, letters.deleteLetter);

export default letterRouter;
