import { configureStore } from '@reduxjs/toolkit';

import exhibitsReducer from './exhibitSlice';
import exhibitionsReducer from './exhibitionsSlice';
import listReducer from './listSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    exhibit: exhibitsReducer,
    exhibitions: exhibitionsReducer,
    list: listReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
