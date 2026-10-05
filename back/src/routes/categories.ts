import { Router } from 'express';
import { category } from '../controllers/categories';
import { categoryDeleteValidator, categoryUpdateValidator, categoryValidator } from '../middlewares/validators/categoryValidator';

const categoryRouter = Router();

categoryRouter.get('/', category.getCategories);
categoryRouter.post('/', categoryValidator, category.createCategory);
categoryRouter.patch('/:name', categoryUpdateValidator, category.updateCategory);
categoryRouter.get('/:name', category.getExhibitsByCategory);
categoryRouter.delete('/:name', categoryDeleteValidator, category.deleteCategory);

export default categoryRouter;
