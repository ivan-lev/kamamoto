import type { ExhibitAdmin } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibitAdmin } from '@/types/exhibitType';

interface Exhibits {
	exhibits: ExhibitAdmin[];
	exhibitToEdit: ExhibitAdmin;
	isExistingExhibitEdited: boolean;
}

const initialState: Exhibits = {
	exhibits: [],
	exhibitToEdit: { ...defaultExhibitAdmin },
	isExistingExhibitEdited: false,
};

const exhibits = createSlice({
	name: 'exhibits',
	initialState,
	reducers: {

		clearExhibitForm: (state) => {
			state.exhibitToEdit = { ...defaultExhibitAdmin };
			state.isExistingExhibitEdited = false;
		},

		setExhibits: (state, action: { payload: ExhibitAdmin[] }) => {
			state.exhibits = action.payload;
			return state;
		},

		setExhibitToEdit: (state, action: { payload: ExhibitAdmin }) => {
			const exhibit = { ...action.payload };
			exhibit.id = Number(exhibit.id);
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
	setExhibitToEdit,
	setIsExistingExhibitEdited,
} = exhibits.actions;

export default exhibits.reducer;
