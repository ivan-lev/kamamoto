import type { NextFunction, Request, Response } from 'express';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { ValidationError } from '../errors/validation-error';
import { getGalleryFolder, isGalleryTarget, isValidGalleryKey } from '../utils/gallery';
import { getImageFolder, IMAGE_TARGETS, isImageTarget, isValidImageKey } from '../utils/images';
import { findOgFile, getOgFolder, isOgTarget, removeOgFiles } from '../utils/ogImage';
import { getSlidesFolder, isSlidesTarget, isValidSlidesKey } from '../utils/slides';
import { ERROR_MESSAGES } from '../variables/messages';

const IMAGE_MIME_REGEX = /^image\/(?:jpeg|png|webp|avif|gif)$/;
const OG_MIME_REGEX = /^image\/(?:jpeg|webp)$/;
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
	// только для одиночных картинок (карты стилей): в слайды svg не пропускает IMAGE_MIME_REGEX
	'image/svg+xml': '.svg',
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

function getRequestGalleryFolder(req: Request) {
	const target = req.params.target as string;
	const key = req.params.key as string;

	if (!isGalleryTarget(target))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TARGET);

	if (!isValidGalleryKey(target, key))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_KEY);

	return getGalleryFolder(target, key);
}

function getRequestImageTarget(req: Request) {
	const target = req.params.target as string;

	if (!isImageTarget(target))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TARGET);

	return target;
}

function getRequestImageFolder(req: Request) {
	const target = getRequestImageTarget(req);
	const key = req.params.key as string | undefined;

	if (!isValidImageKey(target, key))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_KEY);

	return getImageFolder(target, key);
}

function getRequestOgFolder(req: Request) {
	const target = req.params.target as string;
	const key = req.params.key as string;

	if (!isOgTarget(target))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TARGET);

	if (!isValidSlidesKey(key))
		throw new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_KEY);

	return getOgFolder(target, key);
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

// Несколько картинок за раз (слайды статьи, фото лота): отличаются только папкой и запасным именем файла
function createMultipleUpload(getFolder: (req: Request) => UploadFolder, fallbackName: string) {
	const uploadFiles = multer({
		storage: createStorage(getFolder, fallbackName),
		fileFilter: (_req, file, callback) => {
			if (IMAGE_MIME_REGEX.test(file.mimetype))
				return callback(null, true);

			callback(new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TYPE));
		},
		limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
	}).array('files', MAX_FILES);

	return function (req: Request, res: Response, next: NextFunction) {
		uploadFiles(req, res, (error: unknown) => {
			if (error)
				return next(getUploadError(error, ERROR_MESSAGES.UPLOAD.TOO_MANY));

			const files = req.files as Express.Multer.File[] | undefined;
			if (!files?.length)
				return next(new ValidationError(ERROR_MESSAGES.UPLOAD.NO_FILES));

			const { url } = getFolder(req);
			res.status(201).send(files.map(file => ({ filename: file.filename, url: `${url}/${file.filename}` })));
		});
	};
}

const uploadImageFile = multer({
	storage: createStorage(getRequestImageFolder, 'image'),
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

// og-картинка всегда называется og.jpg / og.webp (так её находит getOgImage) и перезаписывается:
// кэш браузеров и соцсетей сбрасывает версия ?v=<mtime> в адресе
const uploadOgFile = multer({
	storage: multer.diskStorage({
		destination: (req, _file, callback) => {
			try {
				const { dir } = getRequestOgFolder(req);
				fs.mkdirSync(dir, { recursive: true });
				callback(null, dir);
			}
			catch (error) {
				callback(error as Error, '');
			}
		},
		filename: (_req, file, callback) => {
			callback(null, `og${MIME_EXTENSIONS[file.mimetype]}`);
		},
	}),
	fileFilter: (_req, file, callback) => {
		if (OG_MIME_REGEX.test(file.mimetype))
			return callback(null, true);

		callback(new ValidationError(ERROR_MESSAGES.UPLOAD.WRONG_TYPE_JPG_WEBP));
	},
	limits: { fileSize: MAX_FILE_SIZE, files: 1 },
}).single('file');

const uploadSlides = createMultipleUpload(getRequestSlidesFolder, 'slide');

// Фото записи (лота). В БД имена файлов сохраняет фронт, отдельным запросом
const uploadGallery = createMultipleUpload(getRequestGalleryFolder, 'image');

// Одна картинка записи (термина словаря, тхумб или карта стиля). В БД запись сохраняет фронт, отдельным запросом
function uploadImage(req: Request, res: Response, next: NextFunction) {
	uploadImageFile(req, res, (error: unknown) => {
		if (error)
			return next(getUploadError(error, ERROR_MESSAGES.UPLOAD.ONLY_ONE));

		if (!req.file)
			return next(new ValidationError(ERROR_MESSAGES.UPLOAD.NO_FILES));

		const { url } = getRequestImageFolder(req);
		res.status(201).send({ filename: req.file.filename, url: `${url}/${req.file.filename}` });
	});
}

async function sendOgFile(req: Request, res: Response, status = 200) {
	const { dir, url } = getRequestOgFolder(req);
	const ogFile = await findOgFile(dir);
	res.status(status).json(ogFile && { filename: ogFile.filename, url: `${url}/${ogFile.filename}?v=${ogFile.version}` });
}

// Текущая og-картинка записи или null. Публичная, как и сама картинка в static/
async function getOg(req: Request, res: Response, next: NextFunction) {
	try {
		await sendOgFile(req, res);
	}
	catch (error) {
		next(error);
	}
}

function uploadOg(req: Request, res: Response, next: NextFunction) {
	uploadOgFile(req, res, async (error: unknown) => {
		try {
			if (error)
				throw getUploadError(error, ERROR_MESSAGES.UPLOAD.ONLY_ONE);

			if (!req.file)
				throw new ValidationError(ERROR_MESSAGES.UPLOAD.NO_FILES);

			// og другого формата заслонил бы новую картинку (jpg ищется первым)
			await removeOgFiles(getRequestOgFolder(req).dir, req.file.filename);
			await sendOgFile(req, res, 201);
		}
		catch (uploadError) {
			next(uploadError);
		}
	});
}

async function deleteOg(req: Request, res: Response, next: NextFunction) {
	try {
		await removeOgFiles(getRequestOgFolder(req).dir);
		res.json(null);
	}
	catch (error) {
		next(error);
	}
}

export const uploads = {
	uploadSlides,
	uploadGallery,
	uploadImage,
	getOg,
	uploadOg,
	deleteOg,
};
