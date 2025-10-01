import { Router } from 'express';
import { partners } from '../controllers/partners';
import { partnerCreateValidator, partnerIdValidator, partnerUpdateValidator } from '../middlewares/validators/partnerValidator';

const partnerRouter = Router();

partnerRouter.get('/', partners.getPartners);
partnerRouter.post('/', partnerCreateValidator, partners.createPartner);
partnerRouter.patch('/:_id', partnerUpdateValidator, partners.updatePartner);
partnerRouter.delete('/:_id', partnerIdValidator, partners.deletePartner);

export default partnerRouter;
