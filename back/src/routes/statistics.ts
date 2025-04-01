import { Router } from 'express';
import { getStatistics } from '../controllers/statistics';

const statisticsRouter = Router();

statisticsRouter.get('/', getStatistics);

export default statisticsRouter;
