import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsApi } from '@api';
import { INGREDIENTS_SLICE_NAME } from '../../services/slices/sliceNames';

export const getIngredientsThunk = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/getAll`,
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } 
    catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      else return rejectWithValue('Не удалось получить данные :(');
    }
  },
); 
