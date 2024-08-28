import { configureStore } from '@reduxjs/toolkit';

import exhibitsReducer from './exhibitSlice';
import exhibitionsReducer from './exhibitionsSlice';
import listReducer from './listSlice';
import categoryReducer from './categorySlice';
import partnersReducer from './partnersSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    exhibit: exhibitsReducer,
    exhibitions: exhibitionsReducer,
    list: listReducer,
    partners: partnersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
