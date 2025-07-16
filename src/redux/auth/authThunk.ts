import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import getErrorMessage from "../../utils/getErrorMessage";

interface AuthPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: AuthPayload, { rejectWithValue }) => {
    try {
      console.log("[loginUser] Credentials:", credentials);
      const response = await axios.post("/auth/login", credentials);
      console.log("[loginUser] Response:", response);
      // Return the full response data
      console.log("[loginUser] Response Data:", response.data);
      return response.data;
    } catch (err) {
      console.log("[loginUser] Error:", err);
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ first_name, last_name, email, password }: AuthPayload, thunkAPI) => {
    try {
      await axios.post("/auth/signup", {
        first_name,
        last_name,
        email,
        password,
      });
      // No need to handle token here; backend sets cookie
      return { email, first_name, last_name }; // or return nothing if not needed
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  },
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("[fetchUser] Fetching user...");
      const response = await axios.get("/auth/user", {
        withCredentials: true,
      });
      console.log("[fetchUser] Response:", response);
      if (!response || !response.data) {
        // Do not log as error, just handle gracefully
        console.log("[fetchUser] No response data from server");
        return rejectWithValue("No response data from server");
      }
      console.log("[fetchUser] Response Data:", response.data);
      return response.data;
    } catch (err) {
      if (err?.response?.status === 401) {
        // Not logged in, handle gracefully
        console.log("[fetchUser] Unauthorized");
        return rejectWithValue("Unauthorized");
      }
      // Log unexpected errors
      console.error("[fetchUser] Error:", err);
      return rejectWithValue("Failed to fetch user");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    return true;
  } catch {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});
