import type { Exhibit } from '@/types/exhibitType';
import { defaultExhibit } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';

interface Exhibits {
	exhibits: Exhibit[];
	exhibitToEdit: Exhibit;
	exhibitState: Exhibit;
	isExistingExhibitEdited: boolean;
}

const initialState: Exhibits = {
	exhibits: [],
	exhibitToEdit: { ...defaultExhibit },
	exhibitState: defaultExhibit,
	isExistingExhibitEdited: false,
};

const exhibits = createSlice({
	name: 'exhibits',
	initialState,
	reducers: {

		clearExhibitForm: (state) => {
			state.exhibitToEdit = { ...defaultExhibit };
		},

		setExhibits: (state, action: { payload: Exhibit[] }) => {
			state.exhibits = action.payload;
			return state;
		},

		setExhibitToEdit: (state, action: { payload: Exhibit }) => {
			state.exhibitToEdit = { ...defaultExhibit, ...action.payload };
		},

		setIsExistingExhibitEdited: (state, action: { payload: boolean }) => {
			state.isExistingExhibitEdited = action.payload;
		},
	},
});

export const {
	clearExhibitForm,
	setExhibits,
	setExhibitToEdit,
	setIsExistingExhibitEdited,
} = exhibits.actions;

export default exhibits.reducer;
