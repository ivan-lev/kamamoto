import type { Request } from 'express';

// то, что auth кладёт в req.user из проверенного JWT (подписывает login в controllers/users.ts)
export interface TokenPayload {
	_id: string;
}

// запрос после auth / requireAuth / optionalAuth: user есть, только если пришёл валидный токен
export type AuthRequest = Request & { user?: TokenPayload };
