import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import incomeReducer from "./income/incomeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
     income: incomeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
