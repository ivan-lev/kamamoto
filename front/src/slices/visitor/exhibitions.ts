import type { PayloadAction } from '@reduxjs/toolkit';
import type { Exhibition, PublicExhibition } from '@/types/exhibitionType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibition } from '@/types/exhibitionType';

interface exhibitionsState {
	exhibitionsList: PublicExhibition[];
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
		setExhibitionsList: (state, action: PayloadAction<PublicExhibition[]>) => {
			if (state.exhibitionsList.length === 0) {
				state.exhibitionsList = [...action.payload];
			}
		},

		setExhibitionToDisplay: (state, action: PayloadAction<Exhibition>) => {
			state.exhibitionToDisplay = { ...action.payload };
		},

		resetExhibitionToDisplay: (state) => {
			state.exhibitionToDisplay = { ...defaultExhibition };
		},
	},
});

export const { setExhibitionsList, setExhibitionToDisplay, resetExhibitionToDisplay } = exhibitionsSlice.actions;

export default exhibitionsSlice.reducer;
