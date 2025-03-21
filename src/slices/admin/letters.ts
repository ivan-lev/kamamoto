import type { File } from '@/types/file';
import { createSlice } from '@reduxjs/toolkit';

interface Letters {
	letters: File[];
}

const initialState: Letters = {
	letters: [],
};

const letters = createSlice({
	name: 'letters',
	initialState,
	reducers: {
		setLetters: (state, action) => {
			state.letters = [...action.payload];
		},
	},
});

export const { setLetters } = letters.actions;

export default letters.reducer;
