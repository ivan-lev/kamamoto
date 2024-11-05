import { createSlice } from '@reduxjs/toolkit';

interface Category {
	category: string;
	title: string;
	thumbnail: string;
	thumbnailPath: string;
}

const initialState: Category[] = [];

const categoriesSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			return action.payload;
		},
	},
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
