import { createSlice } from '@reduxjs/toolkit';

import { ExhibitCategory } from '../types/exhibitCategory';

interface categoryState {
  category: ExhibitCategory | undefined;
}

const initialState: categoryState = {
  category: undefined
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    resetCategory: state => {
      state.category = undefined;
    }
  }
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
