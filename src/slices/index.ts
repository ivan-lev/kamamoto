import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories';
import categoryReducer from './categorySlice';
import exhibitionsReducer from './exhibitionsSlice';
import exhibitsReducer from './exhibitSlice';
import letterReducer from './lettersSlice';
import listReducer from './listSlice';
import partnersReducer from './partnersSlice';
import statisticsReducer from './statisticsSlice';

const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		category: categoryReducer,
		exhibit: exhibitsReducer,
		exhibitions: exhibitionsReducer,
		letters: letterReducer,
		list: listReducer,
		partners: partnersReducer,
		statistics: statisticsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
