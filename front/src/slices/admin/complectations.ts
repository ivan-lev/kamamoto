import type { Complectation } from '@/types/compleactation';
import { createSlice } from '@reduxjs/toolkit';

interface CompleactationState {
	complectations: Complectation[];
}

const initialState: CompleactationState = {
	complectations: [],
};

const complectations = createSlice({
	name: 'complectations',
	initialState,
	reducers: {
		setComplectations: (state, action) => {
			state.complectations = [...action.payload];
		},
	},
});

export const {
	setComplectations,
} = complectations.actions;

export default complectations.reducer;
