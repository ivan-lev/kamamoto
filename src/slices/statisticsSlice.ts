import { createSlice } from '@reduxjs/toolkit';

const initialState = { isInitial: true, exhibits: 0, exhibitions: 0, categories: 0, partners: 0, letters: 0 };

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics: (state, action) => { return { ...state, ...action.payload, isInitial: false }; },
  },
});

export const { setStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;
