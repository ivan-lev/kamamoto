import { configureStore } from '@reduxjs/toolkit';

import exhibitsReducer from './exhibitSlice';
import exhibitionsReducer from './exhibitionsSlice';
import listReducer from './listSlice';
import categoryReducer from './categorySlice';
import partnersReducer from './partnersSlice';
import letterReducer from './lettersSlice'

const store = configureStore({
  reducer: {
    category: categoryReducer,
    exhibit: exhibitsReducer,
    exhibitions: exhibitionsReducer,
    letters: letterReducer,
    list: listReducer,
    partners: partnersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
