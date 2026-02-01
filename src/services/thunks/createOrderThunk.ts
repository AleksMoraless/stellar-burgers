import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderBurgerApi } from '@api';
import { ORDER_SLICE_NAME } from '../slices/sliceNames';
import { constructorActions } from "../slices/burgerBuilderSlice";

export const createOrderThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrder`,
  async (data: string[], { rejectWithValue, dispatch }) => {
    try {
        const createOrderRespond = await orderBurgerApi(data);
        if (!createOrderRespond.success) {
          return rejectWithValue('Не удалось сделать заказ :(');
        }
        dispatch(constructorActions.clearIngredients());
        return createOrderRespond;
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось сделать заказ :(');
    }
  },
); 
