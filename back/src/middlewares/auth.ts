import type { NextFunction, Response } from 'express';

import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../config';
import { ERROR_MESSAGES } from '../variables/messages';
import { AuthorizationError } from '../errors/authorization-error';

export function auth(req: any, res: Response, next: NextFunction): void {
  const { authorization }: { authorization: string } = req.headers;

  // pass next all get requests if it is not user login checking
  if (req.method === 'GET' && req.originalUrl !== '/users/') {
    return next();
  }

  if (!authorization?.startsWith('Bearer ')) {
    return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  const token: string = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'default-key',
    );
  }
  catch (error) {
    console.error(error);
    return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  req.user = payload;
  next();
}
