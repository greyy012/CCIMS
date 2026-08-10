import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/login", data);
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { error: "Login failed. Is the server running on port 5000?" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;