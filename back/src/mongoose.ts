import mongoose from 'mongoose';

import { DB_URL } from './config';

async function connectToDatabase() {
	try {
		await mongoose.connect(DB_URL);
	}
	catch (error) {
		console.error('MongoDB connection failed', error);
	}
}

export default connectToDatabase;
