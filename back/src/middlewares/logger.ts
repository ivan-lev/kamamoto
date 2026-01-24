import expressWinston from 'express-winston';
import { format, transports } from 'winston';

const requestLogger = expressWinston.logger({
	transports: [
		new transports.File({ filename: './logs/request.log' }),
	],
	format: format.combine(
		format.timestamp(),
		format.json(),
	),
});

const errorLogger = expressWinston.errorLogger({
	transports: [
		new transports.File({ filename: './logs/error.log' }),
	],
	format: format.combine(
		format.timestamp(),
		format.json(),
	),
});

const logger = { requestLogger, errorLogger };
export default logger;
