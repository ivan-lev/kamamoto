import { Router } from 'express';
import { meibutsu } from '../controllers/meibutsu';
import { meibutsuIdValidator, meibutsuValidator } from '../middlewares/validators/meibutsuValidator';

const meibutsuRouter = Router();

meibutsuRouter.get('/', meibutsu.getMeibutsuList);
meibutsuRouter.post('/', meibutsuValidator, meibutsu.createMeibutsu);
// статический путь объявлен раньше параметра, иначе запись с id «articles» открыть нельзя
meibutsuRouter.get('/articles', meibutsu.getMeibutsuArticlesList);
meibutsuRouter.get('/:id', meibutsuIdValidator, meibutsu.getMeibutsuArticle);
meibutsuRouter.delete('/:id', meibutsuIdValidator, meibutsu.deleteMeibutsu);
meibutsuRouter.patch('/:id', meibutsuIdValidator, meibutsu.updateMeibutsu);

export default meibutsuRouter;
