import { createSlice } from '@reduxjs/toolkit';

import { File } from '../types/file';

const initialState: File[] = [];

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    setLettersList: (state, action) => {
      if (state.length === 0) {
        return [...action.payload];
      }
    }
  }
});

export const { setLettersList } = lettersSlice.actions;

export default lettersSlice.reducer;
