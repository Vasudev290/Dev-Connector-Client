import { createSlice } from "@reduxjs/toolkit";

const feedSlices = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeedData, removeFeed } = feedSlices.actions;
export default feedSlices.reducer;
