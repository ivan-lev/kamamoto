export function checkResponseStatus(response: Response) {
	if (!response.ok) {
		console.error(`Ошибка: ${response.status}`);
		return Promise.reject(response);
	}
	return response.json();
}
