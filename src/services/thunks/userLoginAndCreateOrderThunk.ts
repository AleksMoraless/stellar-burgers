import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginThunk } from "./userLoginThunk";
import { createOrderThunk } from "./createOrderThunk";
import { TLoginData, TAuthResponse, TNewOrderResponse } from "@api";
import { USER_SLICE_NAME } from "../slices/sliceNames";

type CombinedResponse = {
  login: TAuthResponse;
  order: TNewOrderResponse;
};

export const userLoginAndCreateOrderThunk = createAsyncThunk<
  CombinedResponse,
  { credentials: TLoginData; orderData: string[] }, 
  { rejectValue: string}
>(
  `${USER_SLICE_NAME}/loginAndCreateOrder`,
  async ({ credentials, orderData }, { dispatch, rejectWithValue }) => {
    try {
      const loginResult = await dispatch(userLoginThunk(credentials)).unwrap();
      if (!loginResult.success) {
        return rejectWithValue('Логин не удался');
      }
      try {
        const orderResult = await dispatch(createOrderThunk(orderData)).unwrap();
        if (!orderResult.success) {
          return rejectWithValue('Не удалось создать заказ');
        }
        return {
          login: loginResult,
          order: orderResult
        };
        
      } catch (orderError: any) {
        return rejectWithValue('Ошибка создания заказа');
      }
      
    } catch (loginError: any) {
      return rejectWithValue('Ошибка авторизации');
    }
  }
);
