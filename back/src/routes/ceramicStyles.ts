import { Router } from 'express';
import { ceramicStyle } from '../controllers/ceramicStyles';
import { ceramicStyleValidator } from '../middlewares/validators/ceramicStyleValidators';

const categoryRouter = Router();

categoryRouter.get('/', ceramicStyle.getCeramicStyles);
categoryRouter.post('/', ceramicStyleValidator, ceramicStyle.createCeramicStyle);

export default categoryRouter;
