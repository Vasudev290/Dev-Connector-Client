import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlices";
import feedReducer from "./Slices/feedSlices";
import connectionReducer from "./Slices/connectionSlices";
import requestReducer from "./Slices/requestSlices";
const Store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default Store;
