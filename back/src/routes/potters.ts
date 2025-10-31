import { Router } from 'express';
import { potter } from '../controllers/potters';
import { potterIdValidator, potterValidator } from '../middlewares/validators/potterValidator';

const potterRouter = Router();

potterRouter.get('/', potter.getPotters);
potterRouter.post('/', potterValidator, potter.createPotter);
potterRouter.get('/:id', potterIdValidator, potter.findPotterById);
potterRouter.delete('/:id', potterIdValidator, potter.deletePotter);
potterRouter.patch('/:id', potterIdValidator, potter.updatePotter);

export default potterRouter;
