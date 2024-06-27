import { createSlice } from '@reduxjs/toolkit';

import { ExhibitsCategory } from '../types/exhibitsCategory';
import type { Exhibit } from '../types/exhibitType';
import { exhibits } from '../variables/exhibits';

interface exhibitsState {
  exhibitsCategory?: ExhibitsCategory;
  exhibitsList: Exhibit[];
  exhibit?: Exhibit;
}

const initialState: exhibitsState = {
  exhibitsCategory: undefined,
  exhibitsList: [],
  exhibit: undefined
};

const exhibitsSlice = createSlice({
  name: 'exhibits',
  initialState,
  reducers: {
    setExhibitsCategory: (state, action) => {
      state.exhibitsCategory = ExhibitsCategory[action.payload as keyof typeof ExhibitsCategory];
    },

    setExhibitsList: (state, action) => {
      const categoryName = ExhibitsCategory[action.payload as keyof typeof ExhibitsCategory];
      state.exhibitsList = exhibits.filter(exhibit => exhibit.category === categoryName);
    },

    resetExhibitionList: state => {
      state.exhibitsCategory = undefined;
      state.exhibitsList = [];
    },

    setExhibit: (state, action) => {
      state.exhibit = exhibits.find(exhibit => exhibit.id === action.payload);
    },

    resetExhibit: state => {
      state.exhibit = undefined;
    }
  }
});

export const {
  setExhibitsCategory,
  setExhibitsList,
  resetExhibitionList,
  setExhibit,
  resetExhibit
} = exhibitsSlice.actions;

export default exhibitsSlice.reducer;
