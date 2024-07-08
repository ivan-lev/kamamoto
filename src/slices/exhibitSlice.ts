import { createSlice } from '@reduxjs/toolkit';

import { exhibits } from '../variables/exhibits/index';
import type { Exhibit } from '../types/exhibitType';
import { Images } from '../types/imageType';

interface exhibitState {
  info?: Exhibit;
  images?: Images;
}

const initialState: exhibitState = {
  info: undefined,
  images: undefined
};

const exhibitSlice = createSlice({
  name: 'exhibit',
  initialState,
  reducers: {
    setExhibit: (state, action) => {
      state.info = exhibits.find(exhibit => exhibit.id === Number(action.payload));
    },

    resetExhibit: state => {
      state.info = undefined;
    },

    setImages: (state, action) => {
      state.images = action.payload;
    },

    resetImages: state => {
      state.images = [];
    }
  }
});

export const { setExhibit, resetExhibit, setImages, resetImages } = exhibitSlice.actions;

export default exhibitSlice.reducer;
