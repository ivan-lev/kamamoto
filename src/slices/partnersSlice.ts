import { createSlice } from '@reduxjs/toolkit';

import { Partner } from '../types/partnerType';

const initialState: Partner[] = [];

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setPartnersList: (state, action) => {
      if (state.length === 0) {
        return [...action.payload];
      }
    }
  }
});

export const { setPartnersList } = partnersSlice.actions;

export default partnersSlice.reducer;
