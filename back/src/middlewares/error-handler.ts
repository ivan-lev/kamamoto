import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ERROR_MESSAGES } from '../variables/messages';

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // if error was not catched before, give it status 500
  const { statusCode = 500, message }: { statusCode: number; message: string } = err;

  res.status(statusCode).send({
    // if status 500, generate default message for 500 error
    message: statusCode === 500 ? ERROR_MESSAGES.DEFAULT_MESSAGE : message,
  });
  return next();
};
