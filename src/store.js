import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlices";
import feedReducer from "./Slices/feedSlices";
const Store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default Store;
