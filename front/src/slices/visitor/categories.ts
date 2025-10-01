import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Category {
	name: string;
	title: string;
	thumbnail: string;
	thumbnailPath: string;
}

const initialState: Category[] = [];

const categoriesSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategories: (state: Category[], action: PayloadAction<Category[]>) => {
			if (state.length === 0)
				return action.payload;
		},
	},
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
