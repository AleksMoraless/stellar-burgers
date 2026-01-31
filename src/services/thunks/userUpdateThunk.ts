import { createAsyncThunk } from "@reduxjs/toolkit";
import { TRegisterData, updateUserApi } from '@api';
import { FEED_SLICE_NAME } from '../slices/sliceNames';

export const userUpdateThunk = createAsyncThunk(
  `${FEED_SLICE_NAME}/userUpdate`,
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const userUpdateRespond = await updateUserApi(data);
      if (!userUpdateRespond.success) {
        return rejectWithValue('Не удалось получить данные :(');
      }
      return userUpdateRespond.user;
    }
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось получить данные :(');
    }
  },
); 
