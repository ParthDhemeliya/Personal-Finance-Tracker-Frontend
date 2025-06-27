import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

interface AuthPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: AuthPayload, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ first_name, last_name, email, password }: AuthPayload, thunkAPI) => {
    try {
      const response = await axios.post("/auth/signup", {
        first_name,
        last_name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);