import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "../features/coinsSlice";

export default configureStore({
  reducer: {
    coins: coinsReducer,
  },
});
