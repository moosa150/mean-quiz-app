import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    loader: loaderSlice,
  },
});

export default store;
