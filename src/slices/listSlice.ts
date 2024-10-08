import { createSlice } from '@reduxjs/toolkit';

import { displayListType } from '../types/displayListType';

interface listState {
  displayList: displayListType[];
}

const initialState: listState = {
  displayList: []
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setDisplayList: (state, action) => {
      state.displayList = action.payload;
    },

    resetDisplayList: state => {
      state.displayList = [];
    }
  }
});

export const { setDisplayList, resetDisplayList } = listSlice.actions;

export default listSlice.reducer;
