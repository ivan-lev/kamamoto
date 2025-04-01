import path from 'node:path';
import 'dotenv/config';

const {
  PORT = 0,
  DB_URL = 'CHECK_YOUR_DOTENV',
  NODE_ENV = 'CHECK_YOUR_DOTENV',
  JWT_SECRET = 'CHECK_YOUR_DOTENV',
  BASE_URL = 'CHECK_YOUR_DOTENV',
} = process.env;

const PUBLIC_FOLDER = path.join(__dirname, 'public');

export { BASE_URL, DB_URL, JWT_SECRET, NODE_ENV, PORT, PUBLIC_FOLDER };
