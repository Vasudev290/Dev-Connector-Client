import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequestData: (state, action) => {
      return action.payload;
    },
    removeRequestData: () => null,
  },
});

export const { addRequestData, removeRequestData } = requestSlice.actions;
export default requestSlice.reducer;
