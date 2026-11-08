import { Router } from 'express';
import { searchController } from '../controllers/search';
import { searchValidator } from '../middlewares/validators/searchValidator';

const searchRouter = Router();

// GET проходит мимо auth, поэтому поиск публичный
searchRouter.get('/', searchValidator, searchController.search);

export default searchRouter;
