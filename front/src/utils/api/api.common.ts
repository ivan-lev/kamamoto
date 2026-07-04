export async function checkResponseStatus(response: Response) {
	const data = await response.json().catch(() => null);

	if (!response.ok) {
		const message = data?.message ?? `Ошибка ${response.status}`;
		console.error(message);
		return Promise.reject(new Error(message));
	}

	return data;
}
