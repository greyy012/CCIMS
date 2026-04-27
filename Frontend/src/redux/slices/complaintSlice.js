import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const getComplaints = createAsyncThunk(
  "complaint/get",
  async () => {
    const res = await API.get("/student/complaints");
    return res.data;
  }
);

export const createComplaint = createAsyncThunk(
  "complaint/create",
  async (data) => {
    const res = await API.post("/complaint", data);
    return res.data;
  }
);

const slice = createSlice({
  name: "complaint",
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder.addCase(getComplaints.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default slice.reducer;