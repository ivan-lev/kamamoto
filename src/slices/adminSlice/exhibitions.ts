import type { Exhibition } from '@/types/exhibitionType';
import { defaultExhibition } from '@/types/exhibitionType';
import { createSlice } from '@reduxjs/toolkit';

interface ExhibitionsState {
	exhibitionsList: Exhibition[];
	exhibitionToEdit: Exhibition;
	isExhibitionFormShowed: boolean;
	isExistingExhibitionEdited: boolean;
}

const initialState: ExhibitionsState = {
	exhibitionsList: [],
	exhibitionToEdit: { ...defaultExhibition },
	isExhibitionFormShowed: false,
	isExistingExhibitionEdited: false,
};

const exhibitions = createSlice({
	name: 'exhibitions',
	initialState,
	reducers: {
		setExhibitionsList: (state, action) => {
			if (state.exhibitionsList.length === 0) {
				state.exhibitionsList = [...action.payload];
			}
		},

		setExhibitionToEdit: (state, action) => {
			state.exhibitionToEdit
        = state.exhibitionsList.find(exhibition => exhibition.id === action.payload) || defaultExhibition;
			state.isExhibitionFormShowed = true;
			state.isExistingExhibitionEdited = true;
		},

		resetExhibitionToEdit: (state) => {
			state.exhibitionToEdit = { ...defaultExhibition };
		},

		setExhibitionFormShowed: (state, action) => {
			state.isExhibitionFormShowed = action.payload;
		},

		openEmptyExhibitionForm: (state) => {
			state.exhibitionToEdit = { ...defaultExhibition, id: state.exhibitionsList.length + 1 };
			state.isExistingExhibitionEdited = false;
			state.isExhibitionFormShowed = true;
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
	setExhibitionFormShowed,
	openEmptyExhibitionForm,
	clearExhibitionForm,
	setExhibitionToDisplay,
}
  = exhibitions.actions;

export default exhibitions.reducer;
