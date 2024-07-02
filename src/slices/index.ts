import { configureStore } from '@reduxjs/toolkit';

import exhibitsReducer from './exhibitsSlice';
import listReducer from './listSlice';

const store = configureStore({
  reducer: {
    exhibits: exhibitsReducer,
    list: listReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
