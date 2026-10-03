import { Router } from 'express';
import { exhibition } from '../controllers/exhibitions';
import { optionalAuth } from '../middlewares/auth';
import { exhibitionIdValidator, exhibitionValidator } from '../middlewares/validators/exhibitionValidator';

const exhibitionRouter = Router();

exhibitionRouter.get('/', optionalAuth, exhibition.getExhibitions);
exhibitionRouter.post('/', exhibitionValidator, exhibition.createExhibition);
exhibitionRouter.get('/:id', exhibitionIdValidator, exhibition.getExhibitionById);
exhibitionRouter.patch('/:id', exhibitionValidator, exhibition.updateExhibition);
exhibitionRouter.delete('/:id', exhibitionIdValidator, exhibition.deleteExhibition);

export default exhibitionRouter;
