import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, TLoginData } from '@api';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { setCookie } from "../../utils/cookie";

export const userLoginThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/userLogin`,
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const authRespond = await loginUserApi(data);
      if (!authRespond.success) {
        return rejectWithValue('Не удалось войти :(');
      }
      setCookie('accessToken', authRespond.accessToken);
      localStorage.setItem('refreshToken', authRespond.refreshToken);
      return authRespond.user;
    }
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось войти :(');
    }
  },
); 
