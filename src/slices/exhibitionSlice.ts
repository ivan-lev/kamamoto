import { createSlice } from '@reduxjs/toolkit';

import type { Exhibition } from '../types/exhibitionType';
import { Images } from '../types/imageType';
import { exhibitions } from '../variables/exhibitions';

interface exhibitionState {
  id?: number;
  info?: Exhibition;
  images?: Images;
}

const initialState: exhibitionState = {
  id: undefined,
  info: undefined,
  images: undefined
};

const exhibitionSlice = createSlice({
  name: 'exhibition',
  initialState,
  reducers: {
    setExhibitionId: (state, action) => {
      state.id = Number(action.payload);
    },

    resetExhibitionId: state => {
      state.id = undefined;
    },

    setExhibition: (state, action) => {
      state.info = exhibitions.find(exhibition => exhibition.id === action.payload);
    },

    resetExhibition: state => {
      state.info = undefined;
    },

    setExhibitionImages: (state, action) => {
      state.images = action.payload;
    },

    resetExhibitionImages: state => {
      state.images = undefined;
    }
  }
});

export const {
  setExhibitionId,
  resetExhibitionId,
  setExhibition,
  resetExhibition,
  setExhibitionImages,
  resetExhibitionImages
} = exhibitionSlice.actions;

export default exhibitionSlice.reducer;
