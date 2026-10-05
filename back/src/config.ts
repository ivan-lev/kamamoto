import 'dotenv/config';

const {
	NODE_ENV = 'CHECK_NODE_ENV',
	JWT_SECRET = '',
	BASE_URL = 'CHECK_BASE_URL',
	PORT = 'CHECK_PORT',
	DB_HOST = 'CHECK_DB_HOST',
	DB_PORT = 'CHECK_DB_PORT',
	DB_NAME = 'CHECK_DB_NAME',
	DB_USER = 'CHECK_DB_USER',
	DB_PASS = 'CHECK_DB_PASS',
	STATIC_URL = `${BASE_URL}:${PORT}/static`,
} = process.env;

const JWT_SECRET_MIN_LENGTH = 32;

// Ключ подписи JWT. Ошибка в окружении должна ронять бэк при старте, а не включать ключ из публичного репозитория
function getJwtKey(): string {
	if (NODE_ENV === 'development')
		return 'default-key';

	if (NODE_ENV !== 'production')
		throw new Error(`NODE_ENV должен быть production или development, получено: ${NODE_ENV}`);

	if (JWT_SECRET.length < JWT_SECRET_MIN_LENGTH)
		throw new Error(`В production нужен JWT_SECRET длиной не меньше ${JWT_SECRET_MIN_LENGTH} символов`);

	return JWT_SECRET;
}

const JWT_KEY = getJwtKey();

export { BASE_URL, DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, JWT_KEY, NODE_ENV, PORT, STATIC_URL };
