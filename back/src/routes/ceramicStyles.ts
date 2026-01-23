import { Router } from 'express';
import { ceramicStyle } from '../controllers/ceramicStyles';
import { ceramicStyleValidator } from '../middlewares/validators/ceramicStyleValidators';

const categoryRouter = Router();

categoryRouter.get('/', ceramicStyle.getCeramicStyles);
categoryRouter.get('/ceramic-styles-articles', ceramicStyle.getCeramicStylesArticlesList);
categoryRouter.post('/', ceramicStyleValidator, ceramicStyle.createCeramicStyle);
categoryRouter.patch('/:name', ceramicStyle.updateCeramicStyle);
categoryRouter.delete('/:name', ceramicStyle.deleteCeramicStyle);

export default categoryRouter;
