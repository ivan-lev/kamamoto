import type { Potter } from '@/types/potter';
import { createSlice } from '@reduxjs/toolkit';
import { defaultPotter } from '@/types/potter';

interface Potters {
	pottersList: Potter[];
	potterToEdit: Potter;
	isExistingPotterEdited: boolean;
}

const initialState: Potters = {
	pottersList: [],
	potterToEdit: Object.assign(defaultPotter),
	isExistingPotterEdited: false,
};

const potters = createSlice({
	name: 'potters',
	initialState,
	reducers: {
		setPotters: (state, action: { payload: Potter[] }) => {
			state.pottersList = [...action.payload];
		},

		setPotterToEdit: (state, action: { payload: Potter }) => {
			state.potterToEdit = { ...action.payload };
		},

		clearPotterForm: (state) => {
			state.potterToEdit = Object.assign(defaultPotter);
		},

		setIsExistingPotterEdited: (state, action: { payload: boolean }) => {
			state.isExistingPotterEdited = action.payload;
		},
	},
});

export const {
	setPotters,
	setPotterToEdit,
	clearPotterForm,
	setIsExistingPotterEdited,
} = potters.actions;

export default potters.reducer;
