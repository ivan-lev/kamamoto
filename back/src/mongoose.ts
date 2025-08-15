import mongoose from 'mongoose';

import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './config';

const connectionString = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASS)}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

async function connectToDatabase() {
	try {
		await mongoose.connect(connectionString);
	}
	catch (error) {
		console.error('MongoDB connection failed', error);
	}
}

export default connectToDatabase;
