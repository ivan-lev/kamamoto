import { Dispatch } from '@reduxjs/toolkit';

import { setExhibit } from '../slices/exhibitsSlice';

export const handleSetExhibit = (dispatch: Dispatch) => {
  const currentExhibit = window.location.pathname.split('/').pop();
  dispatch(setExhibit(currentExhibit));
};
