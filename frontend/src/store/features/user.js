import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  orders: []
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    loadOrders: (state, action) => {
      state.orders = action.payload;
    }
  }
});

export const { loadUserInfo, loadOrders } = userSlice.actions;

export const selectUserInfo = (state) => state.userState.userInfo;
export const selectAllOrders = (state) => state.userState.orders;

export default userSlice.reducer;