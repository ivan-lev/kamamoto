import { configureStore } from '@reduxjs/toolkit';

import exhibitsReducer from './exhibitSlice';
import exhibitionReduser from './exhibitionSlice';
import listReducer from './listSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    exhibit: exhibitsReducer,
    exhibition: exhibitionReduser,
    list: listReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
