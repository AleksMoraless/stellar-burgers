import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INGREDIENTS_SLICE_NAME } from "./sliceNames";
import { getIngredientsThunk } from "../thunks/getIngredientsThunk";
import { RequestStatus, TIngredient } from "@utils-types";

type TIngredientState = {
  data: TIngredient[],
  requestStatus: RequestStatus,
  error: null | string
}

const initialState: TIngredientState = {
  data: [],
  requestStatus: RequestStatus.Idle,
  error: null
}

export const ingridientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.data,
    isLoadingSelector: (state) => state.requestStatus,
    getError: (state) => state.error,
    getIngredientByIdSelector: (state, id) => state.data.find(item => item._id === id) ?? null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        state.error = action.payload as string;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload;
      })
  }
});

export const ingredientsSelectors = ingridientsSlice.selectors;
