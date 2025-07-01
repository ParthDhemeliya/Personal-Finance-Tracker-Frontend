import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import incomeReducer from "./income/incomeSlice";
import expenseReducer from "./expense/expense.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
    expenses: expenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
