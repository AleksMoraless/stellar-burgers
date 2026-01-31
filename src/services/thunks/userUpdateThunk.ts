import { createAsyncThunk } from "@reduxjs/toolkit";
import { TRegisterData, updateUserApi } from '@api';
import { FEED_SLICE_NAME } from '../slices/sliceNames';

export const userUpdateThunk = createAsyncThunk(
  `${FEED_SLICE_NAME}/userUpdate`,
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      return await updateUserApi(data);
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось получить данные :(');
    }
  },
); 
