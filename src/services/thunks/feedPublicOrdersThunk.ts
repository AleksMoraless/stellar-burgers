import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFeedsApi } from '@api';
import { FEED_SLICE_NAME } from '../slices/sliceNames';

export const getPublicOrdersThunk = createAsyncThunk(
  `${FEED_SLICE_NAME}/getPublic`,
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось получить данные :(');
    }
  },
); 
