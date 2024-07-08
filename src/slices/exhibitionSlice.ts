import { createSlice } from '@reduxjs/toolkit';

import type { Exhibition } from '../types/exhibitionType';
import { Images } from '../types/imageType';

interface exhibitionState {
  info?: Exhibition;
  images?: Images;
}

const initialState: exhibitionState = {
  info: undefined,
  images: undefined
};

const exhibitionSlice = createSlice({
  name: 'exhibition',
  initialState,
  reducers: {
    setExhibition: (state, action) => {
      state.info = action.payload;
    },

    resetExhibition: state => {
      state.info = undefined;
    },

    setImages: (state, action) => {
      state.images = action.payload;
    },

    resetImages: state => {
      state.images = undefined;
    }
  }
});

export const { setExhibition, resetExhibition, setImages, resetImages } = exhibitionSlice.actions;

export default exhibitionSlice.reducer;
