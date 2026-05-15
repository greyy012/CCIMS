import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createComplaintApi,
  getComplaintsApi,
  updateStatusApi,
  getStudentComplaintsApi,
} from "./complaintAPI";

// CREATE
export const createComplaint = createAsyncThunk(
  "complaint/create",
  async (data) => {
    const res = await createComplaintApi(data);
    return res.data;
  }
);

// FETCH
export const fetchComplaints = createAsyncThunk(
  "complaint/fetch",
  async ({ id, role }) => {
    if (role === "student") {
     
      const res = await getStudentComplaintsApi(id);
      return res.data;
    } else {
    
      const res = await getComplaintsApi({
        staff_id: id,
        role: role,
      });
      return res.data;
    }
  }
);

// UPDATE
export const updateStatus = createAsyncThunk(
  "complaint/update",
  async (data) => {
    const res = await updateStatusApi(data);
    return res.data;
  }
);

const slice = createSlice({
  name: "complaint",
  initialState: {
    list: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComplaints.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export default slice.reducer;