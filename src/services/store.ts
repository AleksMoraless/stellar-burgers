import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingridientsSlice } from './slices/ingridientsSlice';
import { burgerBuilderSlice } from './slices/burgerBuilderSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';
import { orderSlice } from './slices/orderSlice';

export const rootReducer = combineSlices(
  ingridientsSlice, 
  burgerBuilderSlice, 
  feedSlice, 
  userSlice,
  orderSlice
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});


export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
