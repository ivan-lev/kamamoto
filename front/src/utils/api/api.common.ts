export class ApiError extends Error {
	constructor(message: string, public status: number) {
		super(message);
	}
}

// записи по адресу страницы нет (404) или параметр адреса не прошёл валидацию (400, например /exhibitions/abc)
export function isPageMissing(error: unknown) {
	return error instanceof ApiError && (error.status === 404 || error.status === 400);
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
