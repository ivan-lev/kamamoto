export class ApiError extends Error {
	constructor(message: string, public status: number) {
		super(message);
	}
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
