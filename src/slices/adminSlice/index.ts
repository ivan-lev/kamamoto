import { configureStore } from '@reduxjs/toolkit';

import exhibitionsReducer from './exhibitions';
import partnersReducer from './partners';
import useReducer from './user';

const store = configureStore({
	reducer: {
		exhibitions: exhibitionsReducer,
		partners: partnersReducer,
		user: useReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
