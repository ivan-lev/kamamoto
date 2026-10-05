import { Router } from 'express';
import { uploads } from '../controllers/uploads';

const uploadRouter = Router();

uploadRouter.post('/slides/:target/:key', uploads.uploadSlides);
uploadRouter.post('/gallery/:target/:key', uploads.uploadGallery);
uploadRouter.post('/images/:target', uploads.uploadImage);
uploadRouter.post('/images/:target/:key', uploads.uploadImage);
uploadRouter.get('/og/:target/:key', uploads.getOg);
uploadRouter.post('/og/:target/:key', uploads.uploadOg);
uploadRouter.delete('/og/:target/:key', uploads.deleteOg);

export default uploadRouter;
