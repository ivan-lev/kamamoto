export class AuthorizationError extends Error {
	constructor(message: string, public statusCode: number = 401) {
		super(message);
		this.statusCode = 401;
	}
}
