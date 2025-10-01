export default function errorHandler(error: any, defaultMessage: string = 'Что-то пошло не так :(') {
	console.error(error);

	if (error.validation?.body?.message)
		return error.validation.body?.message;

	if (error.message)
		return error.message;

	return defaultMessage;
}
