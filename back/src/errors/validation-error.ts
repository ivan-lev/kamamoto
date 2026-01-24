export class ValidationError extends Error {
	constructor(message: string, public statusCode: number = 400) {
		super(message);
		this.statusCode = 400;
	}
}
