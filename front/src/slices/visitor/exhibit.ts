import type { PayloadAction } from '@reduxjs/toolkit';
import type { ExhibitExtended } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibit } from '@/types/exhibitType';

const initialState: ExhibitExtended = defaultExhibit;

const exhibitSlice = createSlice({
	name: 'exhibit',
	initialState,
	reducers: {
		setExhibit: (state, action: PayloadAction<ExhibitExtended>) => {
			if (!state.id)
				return action.payload;
		},

		resetExhibit: () => defaultExhibit,
	},
},
);

export const {
	setExhibit,
	resetExhibit,
} = exhibitSlice.actions;

export default exhibitSlice.reducer;
