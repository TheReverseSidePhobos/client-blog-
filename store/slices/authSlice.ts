import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  user: any;
  isAuth: boolean;
  isOpenAuthModal: boolean;
  basketDevices: any;
}

const initialState: authState = {
  user: {},
  isAuth: false,
  isOpenAuthModal: false,
  basketDevices: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOpenAuth: (state, action) => {
      state.isOpenAuthModal = action.payload;
    },
    setBasketDevicesToStore: (state, action) => {
      state.basketDevices = action.payload;
    },
  },
});

export const { setAuth, setUser, setOpenAuth, setBasketDevicesToStore } =
  authSlice.actions;

export default authSlice.reducer;
