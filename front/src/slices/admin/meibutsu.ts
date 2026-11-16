import type { Meibutsu } from '@/types/meibutsu';
import { createSlice } from '@reduxjs/toolkit';
import { defaultMeibutsu } from '@/types/meibutsu';

interface MeibutsuState {
	meibutsuList: Meibutsu[];
	meibutsuToEdit: Meibutsu;
	isExistingMeibutsuEdited: boolean;
}

const initialState: MeibutsuState = {
	meibutsuList: [],
	meibutsuToEdit: Object.assign(defaultMeibutsu),
	isExistingMeibutsuEdited: false,
};

const meibutsu = createSlice({
	name: 'meibutsu',
	initialState,
	reducers: {
		setMeibutsu: (state, action: { payload: Meibutsu[] }) => {
			state.meibutsuList = [...action.payload];
		},

		setMeibutsuToEdit: (state, action: { payload: Meibutsu }) => {
			state.meibutsuToEdit = { ...action.payload };
		},

		clearMeibutsuForm: (state) => {
			state.meibutsuToEdit = Object.assign(defaultMeibutsu);
		},

		setIsExistingMeibutsuEdited: (state, action: { payload: boolean }) => {
			state.isExistingMeibutsuEdited = action.payload;
		},

		updateMeibutsu: (state, action: { payload: Meibutsu }) => {
			state.meibutsuList = state.meibutsuList.map(item => item.id !== action.payload.id
				? item
				: action.payload);
		},
	},
});

export const {
	setMeibutsu,
	setMeibutsuToEdit,
	clearMeibutsuForm,
	setIsExistingMeibutsuEdited,
	updateMeibutsu,
} = meibutsu.actions;

export default meibutsu.reducer;
