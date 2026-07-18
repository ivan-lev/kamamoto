---
title: Описание Бэкенда
description: Краткое описание проекта.
---

### Tools and packages

- [mongodb](https://www.mongodb.com/) - database used in project
- [express](https://www.npmjs.com/package/express) - framework to work with Node.js
- [mongoose](https://www.npmjs.com/package/mongoose) - tool to work with the MongoDB
- `winston` / `express-winston` - for logging everything
- `celebrate` - request validation (Joi) as express middleware
- `jsonwebtoken` / `bcryptjs` - authentication and password hashing
- `helmet` - security-related HTTP headers
- `cors` - cross-origin requests configuration
- `express-rate-limit` - rate limiting for the API
- `validator` - string validation helpers
- `dotenv` - loading environment variables from `.env`

### Directories

`/routes` — folder with routing logic
`/controllers` — folder with all controllers
`/models` — folder with files describing MongoDB schemes and models
`/types` — folder with shared TypeScript types and interfaces
`/errors` - error handling logic placed here
`/middlewares` - stores all intermediate processing functions (including `/middlewares/validators` for celebrate/Joi schemas)
`/variables` - shared constants used across the backend
