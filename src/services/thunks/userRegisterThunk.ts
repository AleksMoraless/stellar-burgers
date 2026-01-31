import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserApi, TRegisterData } from '@api';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { setCookie } from "../../utils/cookie";

export const userRegisterThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/userRegister`,
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const authRespond = await registerUserApi(data);
      if (!authRespond.success) {
        return rejectWithValue('Не удалось зарегестрироваться :(');
      }
      setCookie('accessToken', authRespond.accessToken);
      localStorage.setItem('refreshToken', authRespond.refreshToken);
      return authRespond.user;
    }
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось зарегистрировать пользователя :(');
    }
  },
); 
