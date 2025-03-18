import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/register", async (userData) => {
  const response = await axios.post("http://localhost:8080/auth/register", userData);
  return response.data;
});

export const loginUser = createAsyncThunk("auth/login", async (loginData) => {
  const response = await axios.post("http://localhost:8080/auth/login", loginData);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    role: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.name;
        state.token = action.payload.token;
        state.role = action.payload.role;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;