// Types
import type { Category } from '../types/category';
import type { Exhibit, Exhibits } from '../types/exhibitType';
import type { File } from '../types/file';

import { configureStore, createSlice } from '@reduxjs/toolkit';
import { defaultCategory } from '../types/category';
import { defaultExhibit } from '../types/exhibitType';

interface adminState {
	exhibits: Exhibits;
	exhibitToDisplay: Exhibit;
	letters: File[];
	categories: Category[];
	categoryToDisplay: Category;
	isExistingCategoryEdited: boolean;
	exhibitState: Exhibit;
}

const initialState: adminState = {
	exhibits: [],
	exhibitToDisplay: { ...defaultExhibit },
	letters: [],
	categories: [],
	categoryToDisplay: { ...defaultCategory },
	isExistingCategoryEdited: false,
	exhibitState: defaultExhibit,
};

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {

		setExhibits: (state, action) => {
			state.exhibits = action.payload;
			// console.log('payload', action.payload);
			// console.log('state:', state.exhibits);
			return state;
		},

		setExhibitToEdit: () => {
		// console.log('payload', action.payload);
		// console.log('state:', state);
		// console.log(state.exhibits);
		// console.log(state.exhibitions);
		// console.log(state.exhibits.find(exhibit => exhibit.id === action.payload));
		// state.exhibitState
		//   = state.exhibits.find(exhibit => exhibit.id === action.payload) || defaultExhibit;
		// state.isExistingExhibitionEdited = true;
		// const someExhibit = state.exhibits.find(exhibit => exhibit.id === action.payload);
		// console.log(someExhibit);
		},

		setLetters: (state, action) => {
			state.letters = [...action.payload];
		},

		setCategories: (state, action) => {
			state.categories = [...action.payload];
		},

		setCategoryToDisplay: (state, action) => {
			state.categoryToDisplay = { ...action.payload };
		},

		clearCategoryForm: (state) => {
			state.categoryToDisplay = { ...defaultCategory };
		},

		setIsExistingCategoryEdited: (state, action) => {
			state.isExistingCategoryEdited = action.payload;
		},
	},
});

export const {
	setLetters,
	setCategories,
	setCategoryToDisplay,
	clearCategoryForm,
	setIsExistingCategoryEdited,
	setExhibits,
	setExhibitToEdit,
} = adminSlice.actions;

const adminStore = configureStore({
	reducer: {
		admin: adminSlice.reducer,
	},
});

export default adminStore;

export type AdminRootState = ReturnType<typeof adminStore.getState>;
