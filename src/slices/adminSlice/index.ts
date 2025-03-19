import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories';
import exhibitionsReducer from './exhibitions';
import exhibitsReducer from './exibits';
import lettersReducer from './letters';
import partnersReducer from './partners';
import useReducer from './user';

const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		exhibitions: exhibitionsReducer,
		exhibits: exhibitsReducer,
		letters: lettersReducer,
		partners: partnersReducer,
		user: useReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
