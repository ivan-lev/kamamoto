import categoriesReducer from '@/slices/admin/categories';
import ceramicStylesReducer from '@/slices/admin/ceramicStyles';
import exhibitionsReducer from '@/slices/admin/exhibitions';
import exhibitsReducer from '@/slices/admin/exibits';
import lettersReducer from '@/slices/admin/letters';
import partnersReducer from '@/slices/admin/partners';
import useReducer from '@/slices/admin/user';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		ceramicStyles: ceramicStylesReducer,
		exhibitions: exhibitionsReducer,
		exhibits: exhibitsReducer,
		letters: lettersReducer,
		partners: partnersReducer,
		user: useReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
