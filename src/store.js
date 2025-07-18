import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlices";
import feedReducer from "./Slices/feedSlices";
import connectionReducer from "./Slices/connectionSlices";
const Store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export default Store;
