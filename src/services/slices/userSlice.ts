import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_SLICE_NAME } from "./sliceNames";
import { stat } from "fs";
import { RequestStatus, TIngredient, TOrder, TOrdersData, TUser } from "@utils-types";
import { getUserThunk } from "../thunks/getUserThunk";
import { userRegisterThunk } from "../thunks/userRegisterThunk";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { userLoginThunk } from "../thunks/userLoginThunk";
import { userLogoutThunk } from "../thunks/userLogoutThunk";
import { userUpdateThunk } from "../thunks/userUpdateThunk";

export type TUserState = {
  user: TUser | null,
  userChecked: boolean,
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  user: null,
  userChecked: false,
  requestStatus: RequestStatus.Idle
}

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUserCheck: ((state) => {state.userChecked = true}),
  },
  selectors: {
    userSelect: (state) => state.user,
    isAuthCheckedUserSelect: (state) => state.userChecked,
    userIsLoadingSelect: (state) => state.requestStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.userChecked = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload;
        state.userChecked = true;
      })

      .addCase(userRegisterThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(userRegisterThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(userRegisterThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload;
      })

      .addCase(userLoginThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(userLoginThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload;
      })

      .addCase(userLogoutThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(userLogoutThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(userLogoutThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = null;
      })

      .addCase(userUpdateThunk.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(userUpdateThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(userUpdateThunk.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.user = action.payload;
      })
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
