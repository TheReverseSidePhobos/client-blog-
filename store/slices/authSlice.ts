import { UserProp } from "@/components/Header/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  user: any;
  isAuth: boolean;
  isOpenAuthModal: boolean;
}

const initialState: authState = {
  user: {},
  isAuth: false,
  isOpenAuthModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setOpenAuth: (state, action: PayloadAction<boolean>) => {
      state.isOpenAuthModal = action.payload;
    },
  },
});

export const { setAuth, setUser, setOpenAuth } = authSlice.actions;

export default authSlice.reducer;
