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

export async function checkResponseStatus(response: Response) {
	const data = await response.json().catch(() => null);

	if (!response.ok) {
		const message = data?.message ?? `Ошибка ${response.status}`;
		console.error(message);
		return Promise.reject(new ApiError(message, response.status));
	}

	return data;
}
