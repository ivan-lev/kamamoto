import type { ExhibitPayload } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibitPayload } from '@/types/exhibitType';
import floatHandler from '@/utils/floatHandler';

interface Exhibits {
	exhibits: ExhibitPayload[];
	exhibitsFiltered: ExhibitPayload[];
	exhibitToEdit: ExhibitPayload;
	isExistingExhibitEdited: boolean;
}

const initialState: Exhibits = {
	exhibits: [],
	exhibitsFiltered: [],
	exhibitToEdit: { ...defaultExhibitPayload },
	isExistingExhibitEdited: false,
};

const exhibits = createSlice({
	name: 'exhibits',
	initialState,
	reducers: {

		clearExhibitForm: (state) => {
			state.exhibitToEdit = { ...defaultExhibitPayload };
			state.isExistingExhibitEdited = false;
		},

		setExhibits: (state, action: { payload: ExhibitPayload[] }) => {
			state.exhibits = action.payload;
			return state;
		},

		setExhibitsFiltered: (state, action: { payload: ExhibitPayload[] }) => {
			state.exhibitsFiltered = action.payload;
			return state;
		},

		setExhibitToEdit: (state, action: { payload: ExhibitPayload }) => {
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
