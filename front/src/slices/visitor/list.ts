import type { PayloadAction } from '@reduxjs/toolkit';
import type { DisplayListItem } from '@/types/displayListType';
import { createSlice } from '@reduxjs/toolkit';

interface listState {
	displayList: DisplayListItem[];
}

const initialState: listState = {
	displayList: [],
};

const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		setDisplayList: (state, action: PayloadAction<DisplayListItem[]>) => {
			state.displayList = action.payload;
		},

		resetDisplayList: (state) => {
			state.displayList = [];
		},
	},
});

export const { setDisplayList, resetDisplayList } = listSlice.actions;

export default listSlice.reducer;
