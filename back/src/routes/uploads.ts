import { Router } from 'express';
import { uploads } from '../controllers/uploads';

const uploadRouter = Router();

uploadRouter.post('/slides/:target/:key', uploads.uploadSlides);
uploadRouter.post('/images/:target', uploads.uploadImage);

export default uploadRouter;
