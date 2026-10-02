import type { HelmetOptions } from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { BASE_URL, PORT } from './config';
import { pages } from './controllers/pages';
import errorHandler from './middlewares/error-handler';
import celebrateErrorAdapter from './middlewares/error-handler-celebrate';
import limiter from './middlewares/limiter';
import logger from './middlewares/logger';
import { connectToDatabase } from './mongoose';
import routes from './routes';
import { PATHS } from './variables/paths';

const app = express();
const helmetOptions: HelmetOptions = { crossOriginResourcePolicy: false };

connectToDatabase();

app.set('trust proxy', 1); // trust proxy headers
app.use(limiter); // limit requests count
app.use(cors()); // cross-domain settings
app.use(logger.requestLogger); // winston requests logger
app.use(helmet(helmetOptions)); // protect headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(PATHS.STATIC_DIR, { cacheControl: false })); // public folder, lives outside back/ so deploys never wipe it
app.use('/api', routes); // all routes goes through here in Docker
app.get('/{*splat}', pages.renderPage); // html страниц сайта с мета-тегами
app.use(logger.errorLogger); // winston error logger
app.use(celebrateErrorAdapter);// celebrate error handler
app.use(errorHandler); // final error handler

app.listen(PORT, () => {
	console.warn(`Base url is ${BASE_URL}`);
	console.warn(`App listening on port ${PORT}`);
});
