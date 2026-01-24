import mongoose from 'mongoose';

import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './config';

const connectionString = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASS)}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const RECONNECT_DELAY = 5000;
let connecting = false;

export async function connectToDatabase() {
	if (connecting || mongoose.connection.readyState === 1) {
		return;
	}

	connecting = true;

	try {
		await mongoose.connect(connectionString, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		});

		console.log('✅ MongoDB connected'); // eslint-disable-line no-console
	}
	catch (err) {
		console.error('❌ MongoDB connection failed', err);
		setTimeout(connectToDatabase, RECONNECT_DELAY);
	}
	finally {
		connecting = false;
	}
}

mongoose.connection.on('disconnected', () => {
	console.error('⚠️ MongoDB disconnected');
	connectToDatabase();
});

mongoose.connection.on('error', (err) => {
	console.error('❌ MongoDB error', err);
});
