import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutApi } from '@api';
import { USER_SLICE_NAME } from '../slices/sliceNames';

export const userLogoutThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/userLogout`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await logoutApi();
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Ошибка выхода :(');
    }
  },
); 
