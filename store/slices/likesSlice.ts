import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface postsState {
  myLikes: any[];
}

const initialState: postsState = {
  myLikes: [],
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setMyLikes: (state, action: PayloadAction<any[]>) => {
      state.myLikes = action.payload;
    },
    addOneLike: (state, action: PayloadAction<any[]>) => {
      // state.myLikes = action.payload;
      state.myLikes.push(action.payload);
    },
  },
});

export const { setMyLikes, addOneLike } = likesSlice.actions;

export default likesSlice.reducer;
