import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderBurgerApi } from '@api';
import { ORDER_SLICE_NAME } from '../slices/sliceNames';

export const createOrderThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrder`,
  async (data: string[], { rejectWithValue }) => {
    try {
        return await orderBurgerApi(data);
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось сделать заказ :(');
    }
  },
); 
