import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserApi } from '@api';
import { USER_SLICE_NAME } from '../slices/sliceNames';

export const getUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async (_, { rejectWithValue }) => {
    try {
        return await getUserApi();
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось получить пользователя :(');
    }
  },
); 
