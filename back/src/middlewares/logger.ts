import expressWinston from 'express-winston';
import { format, transports } from 'winston';
import { LOG_ROTATION } from '../variables/logs';

const requestLogger = expressWinston.logger({
	transports: [
		new transports.File({ filename: './logs/request.log', ...LOG_ROTATION }),
	],
	format: format.combine(
		format.timestamp(),
		format.json(),
	),
});

const errorLogger = expressWinston.errorLogger({
	transports: [
		new transports.File({ filename: './logs/error.log', ...LOG_ROTATION }),
	],
	format: format.combine(
		format.timestamp(),
		format.json(),
	),
});

const logger = { requestLogger, errorLogger };
export default logger;
