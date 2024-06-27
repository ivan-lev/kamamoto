import { Dispatch } from '@reduxjs/toolkit';

import { setExhibitsCategory } from '../slices/exhibitsSlice';

export const handleSetCategory = (dispatch: Dispatch) => {
  const currentCategory = window.location.pathname.split('/').pop();
  dispatch(setExhibitsCategory(currentCategory));
};
