import type { NextFunction, Request, Response } from 'express';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { ValidationError } from '../errors/validation-error';
import { getSlidesFolder, isSlidesTarget, isValidSlidesKey } from '../utils/slides';
import { ERROR_MESSAGES } from '../variables/messages';

const IMAGE_MIME_REGEX = /^image\/(?:jpeg|png|webp|avif|gif)$/;
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 30;

const CYRILLIC = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const LATIN = 'a|b|v|g|d|e|e|zh|z|i|y|k|l|m|n|o|p|r|s|t|u|f|h|ts|ch|sh|sch||y||e|yu|ya'.split('|');

function getRequestSlidesFolder(req: Request) {
	const target = req.params.target as string;
	const key = req.params.key as string;

	if (!isSlidesTarget(target))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TARGET);

	if (!isValidSlidesKey(key))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_KEY);

	return getSlidesFolder(target, key);
}

// Файлы одного запроса пишутся параллельно, поэтому занятые имена запоминаем, не дожидаясь записи на диск
const reservedFilenames = new WeakMap<Request, Set<string>>();

// Имя файла на латинице без пробелов. Существующие файлы не перезаписываем:
// картинки кэшируются браузером надолго, и под старым именем показывалась бы старая версия
function getFreeFilename(req: Request, dir: string, originalName: string) {
	const reserved = reservedFilenames.get(req) ?? new Set<string>();
	reservedFilenames.set(req, reserved);

	// multer отдаёт имя в latin1, кириллица без перекодировки превращается в мусор
	const decodedName = Buffer.from(originalName, 'latin1').toString('utf8');
	const extension = path.extname(decodedName).toLowerCase().replace('.jpeg', '.jpg');
	const basename = [...path.basename(decodedName, path.extname(decodedName)).toLowerCase()]
		.map(char => CYRILLIC.includes(char) ? LATIN[CYRILLIC.indexOf(char)] : char)
		.join('')
		.replace(/[^a-z0-9_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		|| 'slide';

	let filename = `${basename}${extension}`;
	for (let index = 1; reserved.has(filename) || fs.existsSync(path.join(dir, filename)); index++) {
		filename = `${basename}-${index}${extension}`;
	}

	reserved.add(filename);
	return filename;
}

const upload = multer({
	storage: multer.diskStorage({
		destination: (req, _file, callback) => {
			try {
				const { dir } = getRequestSlidesFolder(req);
				fs.mkdirSync(dir, { recursive: true });
				callback(null, dir);
			}
			catch (error) {
				callback(error as Error, '');
			}
		},
		filename: (req, file, callback) => {
			callback(null, getFreeFilename(req, getRequestSlidesFolder(req).dir, file.originalname));
		},
	}),
	fileFilter: (_req, file, callback) => {
		if (IMAGE_MIME_REGEX.test(file.mimetype))
			return callback(null, true);

		callback(new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TYPE));
	},
	limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
}).array('files', MAX_FILES);

function uploadSlides(req: Request, res: Response, next: NextFunction) {
	upload(req, res, (error: unknown) => {
		if (error instanceof multer.MulterError) {
			const message = error.code === 'LIMIT_FILE_SIZE'
				? ERROR_MESSAGES.UPLOAD.TOO_LARGE
				: error.code === 'LIMIT_FILE_COUNT' || error.code === 'LIMIT_UNEXPECTED_FILE'
					? ERROR_MESSAGES.UPLOAD.TOO_MANY
					: error.message;
			return next(new ValidationError(message));
		}

		if (error)
			return next(error);

		const files = req.files as Express.Multer.File[] | undefined;
		if (!files?.length)
			return next(new ValidationError(ERROR_MESSAGES.UPLOAD.NO_FILES));

		const { url } = getRequestSlidesFolder(req);
		res.status(201).send(files.map(file => ({ filename: file.filename, url: `${url}/${file.filename}` })));
	});
}

export const uploads = {
	uploadSlides,
};
