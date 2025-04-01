import type { Category } from '@/types/category';
import { defaultCategory } from '@/types/category';
import { createSlice } from '@reduxjs/toolkit';

interface Categories {
	categories: Category[];
	categoryToEdit: Category;
	isExistingCategoryEdited: boolean;
}

const initialState: Categories = {
	categories: [],
	categoryToEdit: { ...defaultCategory },
	isExistingCategoryEdited: false,
};

const categories = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = [...action.payload];
		},

		setCategoryToEdit: (state, action) => {
			state.categoryToEdit = { ...action.payload };
		},

		clearCategoryForm: (state) => {
			state.categoryToEdit = { ...defaultCategory };
		},

		setIsExistingCategoryEdited: (state, action) => {
			state.isExistingCategoryEdited = action.payload;
		},
	},
});

export const {
	setCategories,
	setCategoryToEdit,
	clearCategoryForm,
	setIsExistingCategoryEdited,
} = categories.actions;

export default categories.reducer;
