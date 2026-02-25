import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ORDER_SLICE_NAME } from "./sliceNames";
import { RequestStatus, TOrder } from "@utils-types";
import { createOrderThunk } from "../thunks/createOrderThunk";
import { fetchOrderByNumberThunk } from "../thunks/fetchOrderByNumber";

type TOrderState = {
  newOrder: TOrder | null,
  newOrderRequest: boolean,
  
  currentOrder: TOrder | null,
  currentOrderLoading: boolean,
  
  requestStatus: RequestStatus
}

const initialState: TOrderState = {
  newOrder: null,
  newOrderRequest: false,
  currentOrder: null,
  currentOrderLoading: false,
  requestStatus: RequestStatus.Idle
}

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    clearNewOrder: (state) => {state.newOrder = null},
    clearCurrentOrder: (state) => {state.currentOrder = null},
  },
  selectors: {
    newOrderSelect: (state) => state.newOrder,
    newOrderRequestSelect: (state) => state.newOrderRequest,
    currentOrderSelect: (state) => state.currentOrder,
    currentOrderLoadingSelect: (state) => state.currentOrderLoading,

    orderIsLoading: state => state.requestStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.newOrderRequest = true;
      })
      .addCase(createOrderThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.newOrderRequest = false;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.newOrderRequest = false;
        state.newOrder = action.payload.order;
      })

      .addCase(fetchOrderByNumberThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.currentOrderLoading = true;
      })
      .addCase(fetchOrderByNumberThunk.rejected, (state) => {
        state.currentOrderLoading = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
        state.currentOrderLoading = false;
        state.requestStatus = RequestStatus.Success;
        state.currentOrder = action.payload[0];
      })
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;

export default orderSlice.reducer;
