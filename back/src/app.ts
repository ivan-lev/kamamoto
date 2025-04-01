import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import helmet, { type HelmetOptions } from 'helmet';
import mongoose from 'mongoose';

import { DB_URL, PORT, PUBLIC_FOLDER } from './config';

import { errorHandler } from './middlewares/error-handler';
import limiter from './middlewares/limiter';
import { errorLogger, requestLogger } from './middlewares/logger';

import routes from './routes';

import 'dotenv/config';

const app = express();
const helmetOptions: HelmetOptions = { crossOriginResourcePolicy: { policy: 'same-site' } };

mongoose.connect(DB_URL).catch((error: any) => console.error(error));

app.use(limiter); // limit requests count
app.use(cors()); // cross-domain settings
app.use(requestLogger); // winston requests logger
app.use(helmet(helmetOptions)); // protect headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(PUBLIC_FOLDER));
app.use(routes); // all routes goes through here
app.use(errorLogger); // winston error logger
app.use(errors()); // celebrate error handler
app.use(errorHandler); // final error handler

app.listen(PORT, () => {
	// console.log(`App listening on port ${PORT}`);
	// console.log(`DB path is ${DB_URL}`);
});
