import type { Term } from '@/types/term';
import { createSlice } from '@reduxjs/toolkit';
import { defaultTerm } from '@/types/term';

interface Dictionary {
	terms: Term[];
	termToEdit: Term;
	isExistingTermEdited: boolean;
}

const initialState: Dictionary = {
	terms: [],
	termToEdit: { ...defaultTerm },
	isExistingTermEdited: false,
};

const dictionary = createSlice({
	name: 'dictionary',
	initialState,
	reducers: {
		setTerms: (state, action) => {
			state.terms = [...action.payload];
		},

		setTermToEdit: (state, action) => {
			state.termToEdit = { ...action.payload };
		},

		clearTermForm: (state) => {
			state.termToEdit = { ...defaultTerm };
		},

		setIsExistingTermEdited: (state, action) => {
			state.isExistingTermEdited = action.payload;
		},
	},
});

export const {
	setTerms,
	setTermToEdit,
	clearTermForm,
	setIsExistingTermEdited,
} = dictionary.actions;

export default dictionary.reducer;
