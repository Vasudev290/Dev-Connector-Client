import { createSlice } from "@reduxjs/toolkit";

const feedSlices = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    removeFeed: () => {
      return null
    },
  },
});

export const { addFeedData } = feedSlices.actions;
export default feedSlices.reducer;
