import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  userId: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.role = "";
      state.userId = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;