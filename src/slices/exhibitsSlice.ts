import { createSlice } from '@reduxjs/toolkit';

import { ExhibitCategory } from '../types/exhibitCategory';
import type { Exhibit } from '../types/exhibitType';
import { exhibits } from '../variables/exhibits/index';
import { Images } from '../types/imageObjectType';

interface exhibitsState {
  exhibitsCategory?: ExhibitCategory;
  exhibit?: Exhibit;
  images: Images;
}

const initialState: exhibitsState = {
  exhibitsCategory: undefined,
  exhibit: undefined,
  images: []
};

const exhibitsSlice = createSlice({
  name: 'exhibits',
  initialState,
  reducers: {
    setExhibitsCategory: (state, action) => {
      state.exhibitsCategory = ExhibitCategory[action.payload as keyof typeof ExhibitCategory];
      // state.exhibitsCategory = action.payload;
    },

    resetExhibitsCategory: state => {
      state.exhibitsCategory = undefined;
    },

    setExhibit: (state, action) => {
      state.exhibit = exhibits.find(exhibit => exhibit.id === Number(action.payload));
    },

    resetExhibit: state => {
      state.exhibit = undefined;
    },

    setImages: (state, action) => {
      state.images = action.payload;
    },

    resetImages: state => {
      state.images = [];
    }
  }
});

export const {
  setExhibitsCategory,
  resetExhibitsCategory,
  // setExhibitsList,
  // resetExhibitionList,
  setExhibit,
  resetExhibit,
  setImages,
  resetImages
} = exhibitsSlice.actions;

export default exhibitsSlice.reducer;
