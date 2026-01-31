import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FEED_SLICE_NAME } from "./sliceNames";
import { stat } from "fs";
import { RequestStatus, TIngredient, TOrder, TOrdersData } from "@utils-types";
import { getPublicOrdersThunk } from "../thunks/feedPublicOrdersThunk";
import { userOrdersThunk } from "../thunks/feedUserOrdersThunk";

type TFeedState = {
  feed: TOrdersData,
  ordersAuth: TOrder[],
  requestStatus: RequestStatus,
  requestUserOrdersStatus: RequestStatus
}

const initialState: TFeedState = {
  feed: {
    orders: [],
    // success: false,
    total: 0, 
    totalToday: 0,
  },
  ordersAuth: [],
  requestStatus: RequestStatus.Idle,
  requestUserOrdersStatus: RequestStatus.Idle
}

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state.feed.orders,
    getUserOrdersSelect: (state) => state.ordersAuth,
    getFeedSelector: (state) => state.feed,
    isLoadingFeedSelector: (state) => state.requestStatus,
    isLoadingUserOrdersSelector: (state) => state.requestUserOrdersStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublicOrdersThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getPublicOrdersThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getPublicOrdersThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.feed = action.payload;
      })
      .addCase(userOrdersThunk.pending, (state) => {
        state.requestUserOrdersStatus = RequestStatus.Loading
      })
      .addCase(userOrdersThunk.rejected, (state) => {
        state.requestUserOrdersStatus = RequestStatus.Failed
      })
      .addCase(userOrdersThunk.fulfilled, (state, action) => {
        state.requestUserOrdersStatus = RequestStatus.Success
        state.ordersAuth = action.payload;
      })
  }
});

export const feedSelectors = feedSlice.selectors;
