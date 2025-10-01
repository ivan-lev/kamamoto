export class ConflictError extends Error {
  constructor(message: string, public statusCode: number = 409) {
    super(message);
    this.statusCode = 409;
  }
}
