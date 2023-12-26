import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import likesSlice from "./slices/likesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    likes: likesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
