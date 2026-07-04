export class NotFoundError extends Error {
	constructor(message: string, public statusCode: number = 404) {
		super(message);
	}
}
