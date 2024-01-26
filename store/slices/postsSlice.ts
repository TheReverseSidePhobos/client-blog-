import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface postState {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  color: string;
  countLikes: number;
}

export interface postsState {
  allPosts: postState[];
  myPosts: postState[];
}

const initialState: postsState = {
  allPosts: [],
  myPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<postState[]>) => {
      state.allPosts = action.payload;
    },
    setMyPosts: (state, action: PayloadAction<postState[]>) => {
      state.myPosts = action.payload;
    },
    addOneMyPosts: (state, action: PayloadAction<postState>) => {
      [...state.myPosts].push(action.payload);
    },
  },
});

export const { setAllPosts, setMyPosts, addOneMyPosts } = postsSlice.actions;

export default postsSlice.reducer;
