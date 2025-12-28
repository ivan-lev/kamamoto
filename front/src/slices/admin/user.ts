import { createSlice } from '@reduxjs/toolkit';

interface User {
	isLoggedIn: boolean;
}

const initialState: User = {
	isLoggedIn: JSON.parse(localStorage.getItem('kmmtlgn') || 'false'),
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			localStorage.setItem('kmmttkn', action.payload);
			localStorage.setItem('kmmtlgn', 'true');
		},

		logout: (state) => {
			state.isLoggedIn = false;
			localStorage.removeItem('kmmttkn');
			localStorage.removeItem('kmmtlgn');
		},
	},
});

export const { login, logout } = user.actions;

export default user.reducer;
