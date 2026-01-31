import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, TLoginData } from '@api';
import { USER_SLICE_NAME } from '../slices/sliceNames';

export const userLoginThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/userLogin`,
  async (data: TLoginData, { rejectWithValue }) => {
    try {
        return await loginUserApi(data);
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось войти :(');
    }
  },
); 
