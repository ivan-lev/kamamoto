import { Router } from 'express';
import { exhibit } from '../controllers/exhibits';
import { exhibitIdValidator, exhibitValidator } from '../middlewares/validators/exhibitValidator';

const exhibitRouter = Router();

exhibitRouter.get('/', exhibit.getExhibits);
exhibitRouter.post('/', exhibitValidator, exhibit.createExhibit);
exhibitRouter.get('/:id', exhibitIdValidator, exhibit.findExhibitById);
exhibitRouter.delete('/:id', exhibitIdValidator, exhibit.deleteExhibit);
exhibitRouter.patch('/:id', exhibitValidator, exhibit.updateExhibit);

export default exhibitRouter;
