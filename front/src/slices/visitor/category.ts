import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface categoryState {
	category: string | undefined;
}

const initialState: categoryState = {
	category: undefined,
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload;
		},

		resetCategory: (state) => {
			state.category = undefined;
		},
	},
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
