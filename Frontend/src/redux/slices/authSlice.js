import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await API.post("/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;