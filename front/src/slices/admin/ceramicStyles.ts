import type { CeramicStyle } from '@/types/ceramicStyles';
import { defaultCeramicStyle } from '@/types/ceramicStyles';
import { createSlice } from '@reduxjs/toolkit';

interface CeramicStyles {
	ceramicStylesList: CeramicStyle[];
	ceramicStyleToEdit: CeramicStyle;
	isExistingStyleEdited: boolean;
}

const initialState: CeramicStyles = {
	ceramicStylesList: [],
	ceramicStyleToEdit: { ...defaultCeramicStyle },
	isExistingStyleEdited: false,
};

const ceramicStyles = createSlice({
	name: 'ceramicStyles',
	initialState,
	reducers: {
		setCeramicStyles: (state, action: { payload: CeramicStyle[] }) => {
			state.ceramicStylesList = [...action.payload];
		},

		setCeramicStyleToEdit: (state, action: { payload: CeramicStyle }) => {
			state.ceramicStyleToEdit = { ...action.payload };
		},

		clearCeramicStyleForm: (state) => {
			state.ceramicStyleToEdit = { ...defaultCeramicStyle };
		},

		setIsExistingStyleEdited: (state, action: { payload: boolean }) => {
			state.isExistingStyleEdited = action.payload;
		},
	},
});

export const {
	setCeramicStyles,
	setCeramicStyleToEdit,
	clearCeramicStyleForm,
	setIsExistingStyleEdited,
} = ceramicStyles.actions;

export default ceramicStyles.reducer;
