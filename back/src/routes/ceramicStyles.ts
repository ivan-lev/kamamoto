import { Router } from 'express';
import { ceramicStyle } from '../controllers/ceramicStyles';
import { categoryDeleteValidator, categoryValidator } from '../middlewares/validators/categoryValidator';

const categoryRouter = Router();

categoryRouter.get('/', ceramicStyle.getCeramicStyles);

export default categoryRouter;
