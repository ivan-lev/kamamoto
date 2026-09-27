import type { NextFunction, Request, Response } from 'express';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { ValidationError } from '../errors/validation-error';
import { getImageFolder, IMAGE_TARGETS, isImageTarget } from '../utils/images';
import { getSlidesFolder, isSlidesTarget, isValidSlidesKey } from '../utils/slides';
import { ERROR_MESSAGES } from '../variables/messages';

const IMAGE_MIME_REGEX = /^image\/(?:jpeg|png|webp|avif|gif)$/;
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 30;

// Расширение берём из MIME-типа, а не из имени: иначе файл с именем x.html и типом image/png
// сохранился бы как .html, и статика отдала бы его как страницу
const MIME_EXTENSIONS: Record<string, string> = {
	'image/jpeg': '.jpg',
	'image/png': '.png',
	'image/webp': '.webp',
	'image/avif': '.avif',
	'image/gif': '.gif',
};

const CYRILLIC = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const LATIN = 'a|b|v|g|d|e|e|zh|z|i|y|k|l|m|n|o|p|r|s|t|u|f|h|ts|ch|sh|sch||y||e|yu|ya'.split('|');

interface UploadFolder {
	dir: string;
	url: string;
}

function getRequestSlidesFolder(req: Request) {
	const target = req.params.target as string;
	const key = req.params.key as string;

	if (!isSlidesTarget(target))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TARGET);

	if (!isValidSlidesKey(key))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_KEY);

	return getSlidesFolder(target, key);
}

function getRequestImageTarget(req: Request) {
	const target = req.params.target as string;

	if (!isImageTarget(target))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TARGET);

	return target;
}

// Файлы одного запроса пишутся параллельно, поэтому занятые имена запоминаем, не дожидаясь записи на диск
const reservedFilenames = new WeakMap<Request, Set<string>>();

// Имя файла на латинице без пробелов. Существующие файлы не перезаписываем:
// картинки кэшируются браузером надолго, и под старым именем показывалась бы старая версия
function getFreeFilename(req: Request, dir: string, file: Express.Multer.File, fallbackName: string) {
	const reserved = reservedFilenames.get(req) ?? new Set<string>();
	reservedFilenames.set(req, reserved);

	// multer отдаёт имя в latin1, кириллица без перекодировки превращается в мусор
	const decodedName = Buffer.from(file.originalname, 'latin1').toString('utf8');
	const extension = MIME_EXTENSIONS[file.mimetype] ?? '';
	const basename = [...path.basename(decodedName, path.extname(decodedName)).toLowerCase()]
		.map(char => CYRILLIC.includes(char) ? LATIN[CYRILLIC.indexOf(char)] : char)
		.join('')
		.replace(/[^a-z0-9_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
		|| fallbackName;

	let filename = `${basename}${extension}`;
	for (let index = 1; reserved.has(filename) || fs.existsSync(path.join(dir, filename)); index++) {
		filename = `${basename}-${index}${extension}`;
	}

	reserved.add(filename);
	return filename;
}

// Хранение общее для слайдов и одиночных картинок, отличается только папка
function createStorage(getFolder: (req: Request) => UploadFolder, fallbackName: string) {
	return multer.diskStorage({
		destination: (req, _file, callback) => {
			try {
				const { dir } = getFolder(req);
				fs.mkdirSync(dir, { recursive: true });
				callback(null, dir);
			}
			catch (error) {
				callback(error as Error, '');
			}
		},
		filename: (req, file, callback) => {
			callback(null, getFreeFilename(req, getFolder(req).dir, file, fallbackName));
		},
	});
}

function getUploadError(error: unknown, tooManyMessage: string) {
	if (!(error instanceof multer.MulterError))
		return error;

	const message = error.code === 'LIMIT_FILE_SIZE'
		? ERROR_MESSAGES.UPLOAD.TOO_LARGE
		: error.code === 'LIMIT_FILE_COUNT' || error.code === 'LIMIT_UNEXPECTED_FILE'
			? tooManyMessage
			: error.message;
	return new ValidationError(message);
}

const uploadSlidesFiles = multer({
	storage: createStorage(getRequestSlidesFolder, 'slide'),
	fileFilter: (_req, file, callback) => {
		if (IMAGE_MIME_REGEX.test(file.mimetype))
			return callback(null, true);

		callback(new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TYPE));
	},
	limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
}).array('files', MAX_FILES);

const uploadImageFile = multer({
	storage: createStorage(req => getImageFolder(getRequestImageTarget(req)), 'image'),
	fileFilter: (req, file, callback) => {
		try {
			const { mimeRegex, wrongTypeMessage } = IMAGE_TARGETS[getRequestImageTarget(req)];
			if (mimeRegex.test(file.mimetype))
				return callback(null, true);

			callback(new ValidationError(wrongTypeMessage));
		}
		catch (error) {
			callback(error as Error);
		}
	},
	limits: { fileSize: MAX_FILE_SIZE, files: 1 },
}).single('file');

function uploadSlides(req: Request, res: Response, next: NextFunction) {
	uploadSlidesFiles(req, res, (error: unknown) => {
		if (error)
			return next(getUploadError(error, ERROR_MESSAGES.UPLOAD.TOO_MANY));

		const files = req.files as Express.Multer.File[] | undefined;
		if (!files?.length)
			return next(new ValidationError(ERROR_MESSAGES.UPLOAD.NO_FILES));

		const { url } = getRequestSlidesFolder(req);
		res.status(201).send(files.map(file => ({ filename: file.filename, url: `${url}/${file.filename}` })));
	});
}

// Одна картинка записи (например, термина словаря). В БД запись сохраняет фронт, отдельным запросом
function uploadImage(req: Request, res: Response, next: NextFunction) {
	uploadImageFile(req, res, (error: unknown) => {
		if (error)
			return next(getUploadError(error, ERROR_MESSAGES.UPLOAD.ONLY_ONE));

		if (!req.file)
			return next(new ValidationError(ERROR_MESSAGES.UPLOAD.NO_FILES));

		const { url } = getImageFolder(getRequestImageTarget(req));
		res.status(201).send({ filename: req.file.filename, url: `${url}/${req.file.filename}` });
	});
}

export const uploads = {
	uploadSlides,
	uploadImage,
};
