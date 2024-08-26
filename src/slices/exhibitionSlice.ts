import { createSlice } from '@reduxjs/toolkit';

import { defaultExhibition, Exhibition } from '../types/exhibitionType';

const initialState: Exhibition = { ...defaultExhibition };

const exhibitionSlice = createSlice({
  name: 'exhibition',
  initialState,
  reducers: {
    setExhibition: (state, action) => {
      return action.payload;
    },

    resetExhibition: state => {
      return { ...defaultExhibition };
    }
  }
});

export const { setExhibition, resetExhibition } = exhibitionSlice.actions;

export default exhibitionSlice.reducer;
