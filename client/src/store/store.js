import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/constants";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
