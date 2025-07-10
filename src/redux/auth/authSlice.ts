import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchUser } from "./authThunk";

interface AuthState {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  hasFetchedUser: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  hasFetchedUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.hasFetchedUser = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          first_name: "", // We'll fill this after fetchUser
          last_name: "",
        };
        state.hasFetchedUser = false; // Trigger fetchUser
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload._id,
          email: action.payload.email,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        };
        state.token = action.payload.token;
        state.hasFetchedUser = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload._id,
          email: action.payload.email,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        };
        state.hasFetchedUser = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasFetchedUser = true; // Prevent infinite retry loop
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
