export class SearchUnavailableError extends Error {
	statusCode = 503;

	constructor(message: string) {
		super(message);
	}
}
