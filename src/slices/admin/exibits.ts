import type { Exhibit } from '@/types/exhibitType';
import { defaultExhibit } from '@/types/exhibitType';
import { createSlice } from '@reduxjs/toolkit';

interface Exhibits {
	exhibits: Exhibit[];
	exhibitToEdit: Exhibit;
	exhibitState: Exhibit;
}

const initialState: Exhibits = {
	exhibits: [],
	exhibitToEdit: { ...defaultExhibit },
	exhibitState: defaultExhibit,
};

const exhibits = createSlice({
	name: 'exhibits',
	initialState,
	reducers: {

		setExhibits: (state, action) => {
			state.exhibits = action.payload;
			// console.log('payload', action.payload);
			// console.log('state:', state.exhibits);
			return state;
		},

		setExhibitToEdit: (state, action) => {
			console.error('payload', action.payload);
			console.error('state:', state);
		// console.log(state.exhibits);
		// console.log(state.exhibitions);
		// console.log(state.exhibits.find(exhibit => exhibit.id === action.payload));
		// state.exhibitState
		//   = state.exhibits.find(exhibit => exhibit.id === action.payload) || defaultExhibit;
		// state.isExistingExhibitionEdited = true;
		// const someExhibit = state.exhibits.find(exhibit => exhibit.id === action.payload);
		// console.log(someExhibit);
		},
	},
});

export const {
	setExhibits,
	setExhibitToEdit,
} = exhibits.actions;

export default exhibits.reducer;
