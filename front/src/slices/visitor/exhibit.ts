import type { PayloadAction } from '@reduxjs/toolkit';
import type { Exhibit } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibit } from '@/types/exhibitType';

const initialState: Exhibit = defaultExhibit;

const exhibitSlice = createSlice({
	name: 'exhibit',
	initialState,
	reducers: {
		setExhibit: (state, action: PayloadAction<Exhibit>) => {
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
