import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFeedsApi, getOrdersApi } from '@api';
import { FEED_SLICE_NAME } from '../slices/sliceNames';

export const userOrdersThunk = createAsyncThunk(
  `${FEED_SLICE_NAME}/getUsers`,
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось получить данные :(');
    }
  },
); 
