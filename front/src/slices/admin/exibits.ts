import type { Exhibit } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibit } from '@/types/exhibitType';

interface Exhibits {
	exhibits: Exhibit[];
	exhibitsFiltered: Exhibit[];
	exhibitToEdit: Exhibit;
	isExistingExhibitEdited: boolean;
}

const initialState: Exhibits = {
	exhibits: [],
	exhibitsFiltered: [],
	exhibitToEdit: { ...defaultExhibit },
	isExistingExhibitEdited: false,
};

const exhibits = createSlice({
	name: 'exhibits',
	initialState,
	reducers: {

		clearExhibitForm: (state) => {
			state.exhibitToEdit = { ...defaultExhibit };
			state.isExistingExhibitEdited = false;
		},

		setExhibits: (state, action: { payload: Exhibit[] }) => {
			state.exhibits = action.payload;
			return state;
		},

		setExhibitsFiltered: (state, action: { payload: Exhibit[] }) => {
			state.exhibitsFiltered = action.payload;
			return state;
		},

		setExhibitToEdit: (state, action: { payload: Exhibit }) => {
			const exhibit = { ...action.payload };
			exhibit.id = Number(exhibit.id);
			exhibit.length = Number(exhibit.length);
			exhibit.width = Number(exhibit.width);
			exhibit.height = Number(exhibit.height);
			exhibit.weight = Number(exhibit.weight);
			exhibit.weightOfSet = Number(exhibit.weightOfSet);
			state.exhibitToEdit = { ...exhibit };
		},

		setIsExistingExhibitEdited: (state, action: { payload: boolean }) => {
			state.isExistingExhibitEdited = action.payload;
		},
	},
});

export const {
	clearExhibitForm,
	setExhibits,
	setExhibitsFiltered,
	setExhibitToEdit,
	setIsExistingExhibitEdited,
} = exhibits.actions;

export default exhibits.reducer;
