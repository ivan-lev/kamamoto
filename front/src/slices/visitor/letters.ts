import type { PayloadAction } from '@reduxjs/toolkit';
import type { File } from '@/types/file';
import { createSlice } from '@reduxjs/toolkit';

const initialState: File[] = [];

const lettersSlice = createSlice({
	name: 'letters',
	initialState,
	reducers: {
		setLettersList: (state, action: PayloadAction<File[]>) => {
			if (state.length === 0) {
				return [...action.payload];
			}
		},
	},
});

export const { setLettersList } = lettersSlice.actions;

export default lettersSlice.reducer;
