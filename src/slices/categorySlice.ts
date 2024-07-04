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
      // state.exhibitsCategory = ExhibitCategory[action.payload as keyof typeof ExhibitCategory];
      state.category = action.payload;
    },

    resetCategory: state => {
      state.category = undefined;
    }
  }
});

export const { setCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
