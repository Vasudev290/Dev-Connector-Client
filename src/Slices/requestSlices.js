import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequestData: (state, action) => {
      return action.payload;
    },
    removeRequestData: (state, action) => {
      const newArray = state.filter((req) => req._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequestData, removeRequestData } = requestSlice.actions;
export default requestSlice.reducer;
