import { createSlice } from "@reduxjs/toolkit";
// import { fetchIncomes, addIncome, updateIncome, deleteIncome } from "";
import { fetchIncomes,addIncome, updateIncome, deleteIncome } from "./incomeThunk";
import { type IncomeEntry } from "../../types/Interface";

interface IncomeState {
  incomes: IncomeEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: IncomeState = {
  incomes: [],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.incomes = action.payload;
        state.loading = false;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
      })

      // Update
      .addCase(updateIncome.fulfilled, (state, action) => {
        const index = state.incomes.findIndex((i) => i._id === action.payload._id);
        if (index !== -1) state.incomes[index] = action.payload;
      })

      // Delete
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter((i) => i._id !== action.payload);
      });
  },
});

export default incomeSlice.reducer;
