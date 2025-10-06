import type { Exhibit } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibit } from '@/types/exhibitType';
import floatHandler from '@/utils/floatHandler';

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
			exhibit.length = floatHandler(exhibit.length || '');
			exhibit.width = floatHandler(exhibit.width || '');
			exhibit.height = floatHandler(exhibit.height || '');
			exhibit.weight = floatHandler(exhibit.weight || '');
			exhibit.weightOfSet = floatHandler(exhibit.weightOfSet || '');
			exhibit.volume = floatHandler(exhibit.volume || '');
			exhibit.diameter = floatHandler(exhibit.diameter || '');
			exhibit.footDiameter = floatHandler(exhibit.footDiameter || '');
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
