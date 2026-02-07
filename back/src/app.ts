import type { HelmetOptions } from 'helmet';
import path from 'node:path';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { BASE_URL, PORT } from './config';
import errorHandler from './middlewares/error-handler';
import limiter from './middlewares/limiter';
import logger from './middlewares/logger';
import { connectToDatabase } from './mongoose';
import routes from './routes';

const app = express();
const helmetOptions: HelmetOptions = { crossOriginResourcePolicy: false };

connectToDatabase();

app.set('trust proxy', true); // trust proxy headers
app.use(limiter); // limit requests count
app.use(cors()); // cross-domain settings
app.use(logger.requestLogger); // winston requests logger
app.use(helmet(helmetOptions)); // protect headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public'), { cacheControl: false })); // public folder
app.use('/api', routes); // all routes goes through here in Docker
app.use(logger.errorLogger); // winston error logger
app.use(errors()); // celebrate error handler
app.use(errorHandler); // final error handler

app.listen(PORT, () => {
	console.warn(`Base url is ${BASE_URL}`);
	console.warn(`App listening on port ${PORT}`);
});
