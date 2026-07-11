import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '@/slices/admin/categories';
import ceramicStylesReducer from '@/slices/admin/ceramicStyles';
import comlectationReducer from '@/slices/admin/complectations';
import dictionaryReducer from '@/slices/admin/dictionary';
import exhibitionsReducer from '@/slices/admin/exhibitions';
import exhibitsReducer from '@/slices/admin/exhibits';
import lettersReducer from '@/slices/admin/letters';
import markersReducer from '@/slices/admin/markers';
import partnersReducer from '@/slices/admin/partners';
import pottersReducer from '@/slices/admin/potters';
import useReducer from '@/slices/admin/user';

export const adminStore = configureStore({
	reducer: {
		categories: categoriesReducer,
		ceramicStyles: ceramicStylesReducer,
		complectations: comlectationReducer,
		dictionary: dictionaryReducer,
		exhibitions: exhibitionsReducer,
		exhibits: exhibitsReducer,
		letters: lettersReducer,
		markers: markersReducer,
		partners: partnersReducer,
		potters: pottersReducer,
		user: useReducer,
	},
});

export type RootState = ReturnType<typeof adminStore.getState>;
