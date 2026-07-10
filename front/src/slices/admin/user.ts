import { createSlice } from '@reduxjs/toolkit';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

interface User {
	isLoggedIn: boolean;
}

const initialState: User = {
	isLoggedIn: storage.get<boolean>(STORAGE_KEYS.IS_LOGGED_IN) ?? false,
};

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			storage.set(STORAGE_KEYS.TOKEN, action.payload);
			storage.set(STORAGE_KEYS.IS_LOGGED_IN, true);
		},

		logout: (state) => {
			state.isLoggedIn = false;
			storage.remove(STORAGE_KEYS.TOKEN);
			storage.remove(STORAGE_KEYS.IS_LOGGED_IN);
		},
	},
});

export const { login, logout } = user.actions;

export default user.reducer;
