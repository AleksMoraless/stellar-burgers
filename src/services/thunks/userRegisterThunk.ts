import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi, TRegisterData } from '@api';
import { USER_SLICE_NAME } from '../slices/sliceNames';

export const userRegisterThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/userRegister`,
  async (data: TRegisterData, { rejectWithValue, dispatch }) => {
    try {
        return await registerUserApi(data);
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось зарегистрировать пользователя :(');
    }
  },
); 
