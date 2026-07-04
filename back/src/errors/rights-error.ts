export class RightsError extends Error {
	constructor(message: string, public statusCode: number = 403) {
		super(message);
	}
}
