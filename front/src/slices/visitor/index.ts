import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '@/slices/visitor/categories';
import categoryReducer from '@/slices/visitor/category';
import complectationsReducer from '@/slices/visitor/complectations';
import exhibitsReducer from '@/slices/visitor/exhibit';
import exhibitionsReducer from '@/slices/visitor/exhibitions';
import letterReducer from '@/slices/visitor/letters';
import listReducer from '@/slices/visitor/list';
import partnersReducer from '@/slices/visitor/partners';
import statisticsReducer from '@/slices/visitor/statistics';

export const visitorStore = configureStore({
	reducer: {
		categories: categoriesReducer,
		category: categoryReducer,
		complectations: complectationsReducer,
		exhibit: exhibitsReducer,
		exhibitions: exhibitionsReducer,
		letters: letterReducer,
		list: listReducer,
		partners: partnersReducer,
		statistics: statisticsReducer,
	},
});

export type RootState = ReturnType<typeof visitorStore.getState>;
