import type { CeramicStyle } from '@/types/ceramicStyles';
import { createSlice } from '@reduxjs/toolkit';
import { defaultCeramicStyle } from '@/types/ceramicStyles';

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

		updateCeramicStyle: (state, action: { payload: CeramicStyle }) => {
			state.ceramicStylesList = state.ceramicStylesList.map(style => style.name !== action.payload.name ? style : action.payload);
		},
	},
});

export const {
	setCeramicStyles,
	setCeramicStyleToEdit,
	clearCeramicStyleForm,
	setIsExistingStyleEdited,
	updateCeramicStyle,
} = ceramicStyles.actions;

export default ceramicStyles.reducer;
