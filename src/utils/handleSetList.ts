import { Dispatch } from '@reduxjs/toolkit';

import { setExhibitsList } from '../slices/exhibitsSlice';

export const handleSetList = (dispatch: Dispatch) => {
  const currentCategory = window.location.pathname.split('/').pop();
  dispatch(setExhibitsList(currentCategory));
};
