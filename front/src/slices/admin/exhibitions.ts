import type { Exhibition } from '@/types/exhibitionType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibition } from '@/types/exhibitionType';

interface ExhibitionsState {
	exhibitionsList: Exhibition[];
	exhibitionToEdit: Exhibition;
	isExistingExhibitionEdited: boolean;
}

const initialState: ExhibitionsState = {
	exhibitionsList: [],
	exhibitionToEdit: { ...defaultExhibition },
	isExistingExhibitionEdited: false,
};

const exhibitions = createSlice({
	name: 'exhibitions',
	initialState,
	reducers: {
		setExhibitionsList: (state, action) => {
			state.exhibitionsList = [...action.payload];
		},

		setExhibitionToEdit: (state, action) => {
			state.exhibitionToEdit = state.exhibitionsList.find(exhibition => exhibition.id === action.payload) || defaultExhibition;
			state.isExistingExhibitionEdited = true;
		},

		resetExhibitionToEdit: (state) => {
			state.exhibitionToEdit = { ...defaultExhibition };
		},

		openEmptyExhibitionForm: (state) => {
			state.exhibitionToEdit = { ...defaultExhibition, id: state.exhibitionsList.length + 1 };
			state.isExistingExhibitionEdited = false;
		},

		clearExhibitionForm: (state) => {
			state.exhibitionToEdit = { ...defaultExhibition, id: state.exhibitionsList.length + 1 };
		},

		setExhibitionToDisplay: (state, action) => {
			state.exhibitionToEdit = { ...action.payload };
		},
	},
});

export const {
	setExhibitionsList,
	setExhibitionToEdit,
	resetExhibitionToEdit,
	openEmptyExhibitionForm,
	clearExhibitionForm,
	setExhibitionToDisplay,
} = exhibitions.actions;

export default exhibitions.reducer;
