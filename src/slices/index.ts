import { configureStore } from '@reduxjs/toolkit';

import exhibitsReducer from './exhibitsSlice';

const store = configureStore({
  reducer: {
    exhibits: exhibitsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
