import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderByNumberApi } from '@api';
import { ORDER_SLICE_NAME } from '../slices/sliceNames';

export const fetchOrderByNumberThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchOrderByNumber`,
  async (data: number, { rejectWithValue }) => {
    try {
        const orderByNumRespond = await getOrderByNumberApi(Number(data));
        if (!orderByNumRespond.success) {
          return rejectWithValue('Не удалось сделать заказ :(');
        } 
        return orderByNumRespond.orders;
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось сделать заказ :(');
    }
  },
); 
