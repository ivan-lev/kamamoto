import { Router } from 'express';
import { category } from '../controllers/categories';
import { categoryDeleteValidator, categoryValidator } from '../middlewares/validators/categoryValidator';

const categoryRouter = Router();

categoryRouter.get('/', category.getCategories);
categoryRouter.post('/', categoryValidator, category.createCategory);
categoryRouter.patch('/:category', category.updateCategory);
categoryRouter.get('/:category', category.getExhibitsByCategory);
categoryRouter.delete('/:category', categoryDeleteValidator, category.deleteCategory);

export default categoryRouter;
