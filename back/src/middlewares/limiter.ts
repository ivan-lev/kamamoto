import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10000,
	message: 'Too many requests from this IP',
	validate: {
		trustProxy: true,
	},
});

export default limiter;
