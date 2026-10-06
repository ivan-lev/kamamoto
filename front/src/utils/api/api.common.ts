import { ERROR_MESSAGES } from '@/variables/variables';

export class ApiError extends Error {
	constructor(message: string, public status: number) {
		super(message);
	}
}

// записи по адресу страницы нет (404) или параметр адреса не прошёл валидацию (400, например /exhibitions/abc)
export function isPageMissing(error: unknown) {
	return error instanceof ApiError && (error.status === 404 || error.status === 400);
}

// текст ошибки для пользователя: у ApiError это сообщение с бэка, у прочих ошибок — их message или запасной текст
export function getErrorMessage(error: unknown, fallback: string = ERROR_MESSAGES.DEFAULT): string {
	return (error instanceof Error && error.message) || fallback;
}

function getResponseMessage(data: unknown): string | undefined {
	if (typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string')
		return data.message;
}

// T — формат успешного ответа, его объявляет функция API в своей сигнатуре (Promise<...>).
// Это единственное место, где мы верим бэку на слово: ответ во время выполнения не проверяется,
// поэтому типы в front/src/types/* должны совпадать с тем, что реально отдаёт бэк (см. .claude/specs/api.md)
export async function checkResponseStatus<T = unknown>(response: Response): Promise<T> {
	const data: unknown = await response.json().catch(() => null);

	if (!response.ok) {
		const message = getResponseMessage(data) ?? `Ошибка ${response.status}`;
		console.error(message);
		throw new ApiError(message, response.status);
	}

	return data as T;
}
