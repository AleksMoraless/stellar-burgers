import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutApi } from '@api';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { deleteCookie } from "../../utils/cookie";

export const userLogoutThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/userLogout`,
  async (_, { rejectWithValue }) => {
    try {
      const logoutRespond = await logoutApi();
      if (!logoutRespond.success) {
        return rejectWithValue('Ошибка выхода :(');
      }
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Ошибка выхода :(');
    }
  },
); 
