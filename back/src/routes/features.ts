import { Router } from 'express';
import { features } from '../controllers/features';
import { ceramicStyleValidator } from '../middlewares/validators/ceramicStyleValidators';

const featureRouter = Router();

featureRouter.get('/', features.getFeatures);
featureRouter.get('/features', features.getFeaturesArticlesList);
featureRouter.get('/:feature', features.getFeatureArticle);
featureRouter.post('/', ceramicStyleValidator, features.createFeature);
featureRouter.patch('/:name', features.updateFeature);
featureRouter.delete('/:name', features.deleteFeature);

export default featureRouter;
