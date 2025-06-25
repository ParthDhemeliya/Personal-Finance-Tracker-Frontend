import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import { type IncomeEntry } from "../../types/Interface";

//  Fetch all incomes
export const fetchIncomes = createAsyncThunk(
  "income/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/v1/incomes");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch incomes",
      );
    }
  },
);

// Add income
export const addIncome = createAsyncThunk(
  "income/add",
  async (
    data: Omit<IncomeEntry, "_id" | "type">, // ✅ removed `type`
    thunkAPI,
  ) => {
    try {
      const res = await axios.post("/v1/incomes", data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add income",
      );
    }
  },
);

//  Update income
export const updateIncome = createAsyncThunk(
  "income/update",
  async (
    { id, data }: { id: string; data: Partial<IncomeEntry> },
    thunkAPI,
  ) => {
    try {
      const res = await axios.put(`/v1/incomes/${id}`, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update income",
      );
    }
  },
);

//  Delete income
export const deleteIncome = createAsyncThunk(
  "income/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/v1/incomes/${id}`);
      return id; // return ID so reducer can filter it out
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete income",
      );
    }
  },
);
