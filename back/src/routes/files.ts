import { Router } from 'express';
import { files } from '../controllers/files';
import { fileDeleteValidator, fileValidator } from '../middlewares/validators/fileValidator';

const letterRouter = Router();

letterRouter.get('/', files.getFiles);
letterRouter.post('/', fileValidator, files.createFile);
letterRouter.patch('/:id', fileValidator, files.updateFile);
letterRouter.delete('/:id', fileDeleteValidator, files.deleteFile);

export default letterRouter;
