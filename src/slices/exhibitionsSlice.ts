import type { Exhibition, Exhibitions } from '../types/exhibitionType';

import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibition } from '../types/exhibitionType';

interface exhibitionsState {
	exhibitionsList: Exhibitions;
	exhibitionToDisplay: Exhibition;
}

const initialState: exhibitionsState = {
	exhibitionsList: [],
	exhibitionToDisplay: { ...defaultExhibition },
};

const exhibitionsSlice = createSlice({
	name: 'exhibitions',
	initialState,
	reducers: {
		setExhibitionsList: (state, action) => {
			if (state.exhibitionsList.length === 0) {
				state.exhibitionsList = [...action.payload];
			}
		},

		setExhibitionToDisplay: (state, action) => {
			state.exhibitionToDisplay = { ...action.payload };
		},

		resetExhibitionToDisplay: (state) => {
			state.exhibitionToDisplay = { ...defaultExhibition };
		},
	},
});

export const { setExhibitionsList, setExhibitionToDisplay, resetExhibitionToDisplay }
  = exhibitionsSlice.actions;

export default exhibitionsSlice.reducer;
