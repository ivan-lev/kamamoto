import { Router } from 'express';
import { ceramicStyle } from '../controllers/ceramicStyles';
import { ceramicStyleValidator } from '../middlewares/validators/ceramicStyleValidators';

const categoryRouter = Router();

categoryRouter.get('/', ceramicStyle.getCeramicStyles);
categoryRouter.get('/articles', ceramicStyle.getCeramicStylesArticles);
categoryRouter.get('/:style', ceramicStyle.getCeramicStylesArticle);
categoryRouter.post('/', ceramicStyleValidator, ceramicStyle.createCeramicStyle);
categoryRouter.patch('/:name', ceramicStyle.updateCeramicStyle);
categoryRouter.delete('/:name', ceramicStyle.deleteCeramicStyle);

export default categoryRouter;
