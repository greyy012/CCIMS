import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "./authAPI";

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginApi(data);   // ✅ FIX
      return res.data;                    // ✅ IMPORTANT
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;  // ✅ now works
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;