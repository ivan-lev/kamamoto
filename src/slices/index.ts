import { configureStore } from '@reduxjs/toolkit';

import exhibitsReducer from './exhibitSlice';
import listReducer from './listSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    exhibit: exhibitsReducer,
    list: listReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
