import type { PayloadAction } from '@reduxjs/toolkit';
import type { ExhibitVisitor } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';
import { defaultExhibit } from '@/types/exhibitType';

const initialState: ExhibitVisitor = defaultExhibit;

const exhibitSlice = createSlice({
	name: 'exhibit',
	initialState,
	reducers: {
		setExhibit: (state, action: PayloadAction<ExhibitVisitor>) => {
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
