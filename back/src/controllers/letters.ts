import type { NextFunction, Request, Response } from 'express';
import type { File } from '../types/file';

import { ERROR_MESSAGES, PATHS } from '../constants';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';

import Letter from '../models/letter';

function getLetters(req: Request, res: Response, next: NextFunction): void {
  Letter.find({}, { _id: 0 })
    .then((letters: File[]) => {
      return letters.map((letter) => {
        letter.name = `${PATHS.PUBLIC_PATH}/${PATHS.LETTERS}/${letter.name}`;
        letter.preview = `${PATHS.PUBLIC_PATH}/${PATHS.LETTERS}/${letter.preview}`;
        return letter;
      });
    })
    .then(letters => res.send(letters))
    .catch((error) => { return next(error); });
}

function createLetter(req: Request, res: Response, next: NextFunction): void {
  const letter = req.body;

  Letter.create({ ...letter })
    .then(letter => res.status(201).send(letter))
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ValidationError(ERROR_MESSAGES.LETTER_WRONG_ID));
      }

      if (error.name === 'ValidationError') {
        return next(new ValidationError(ERROR_MESSAGES.LETTER_WRONG_DATA));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.LETTER_EXISTS));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.LETTER_NOT_FOUND));
      }

      return next(error);
    });
}

function updateLetter(req: Request, res: Response, next: NextFunction): void {
  const newLetterData: File = req.body;
  Letter.findOneAndUpdate({ _id: req.params._id }, newLetterData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then(letter => res.send(letter))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
      }

      if (error.name === 'ValidationError') {
        return next(new ValidationError(ERROR_MESSAGES.PARTNER_WRONG_DATA));
      }

      if (error.name === 'CastError') {
        return next(new NotFoundError(ERROR_MESSAGES.PARTNER_NOT_FOUND));
      }

      return next(error);
    });
}

function deleteLetter(req: Request, res: Response, next: NextFunction): void {
  Letter.findOneAndDelete({ id: req.params.id })
    .orFail()
    .select('_id')
    .then(letter => res.send(letter))
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ValidationError(ERROR_MESSAGES.LETTER_WRONG_ID));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.LETTER_NOT_FOUND));
      }

      return next(error);
    });
}

export const letters = {
  createLetter,
  deleteLetter,
  getLetters,
  updateLetter,
};
