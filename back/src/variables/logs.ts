// ротация: логи живут в слое контейнера и без лимита забивают диск VPS
export const LOG_ROTATION = Object.freeze({
	maxsize: 10 * 1024 * 1024,
	maxFiles: 3,
	tailable: true,
});
