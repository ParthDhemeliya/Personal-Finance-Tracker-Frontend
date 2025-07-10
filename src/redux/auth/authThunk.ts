import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import getErrorMessage from "../../utils/getErrorMessage";

interface AuthPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }: AuthPayload, thunkAPI) => {
//     try {
//       const response = await axios.post("/auth/login", { email, password });
//       // Store token in localStorage for authenticated requests
//       if (response.data && response.data.token) {
//         localStorage.setItem("token", response.data.token);
//       }
//       console.log("loginUser response.data:", response.data);
//       return response.data;
//     } catch (err: unknown) {
//       return thunkAPI.rejectWithValue(getErrorMessage(err));
//     }
//   },
// );
// authThunk.ts
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: AuthPayload, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, email: userEmail, id } = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }

      // Return only what's available
      return { token, email: userEmail, id };
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
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
      console.log("registerUser response.data:", response.data);
      return response.data;
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  },
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("fetchUser token:", token);
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.get("/auth/user");
      console.log("fetchUser response:", response.data);
      return response.data;
    } catch (err: unknown) {
      console.error("fetchUser error:", err);
      return rejectWithValue(getErrorMessage(err));
    }
  },
);
