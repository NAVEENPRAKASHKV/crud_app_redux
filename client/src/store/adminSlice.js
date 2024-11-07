import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";

export const fetchUsers = createAsyncThunk(
  "/admin/fetchuser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      console.log("Fetching admin user data");
      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${state.admin.token}`, // Make sure the token is in `state.admin.token`
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data; // Return the data to pass it to `fulfilled`
    } catch (error) {
      // Return the error to be handled in `rejected`
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);

const initialState = {
  usersInfo: [],
  token: localStorage.getItem("userToken") || null,
  loading: false,
  error: null,
  token: null, // Make sure the token is stored here for use in headers
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.usersInfo = action.payload; // Store the fetched user data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store any error message
      });
  },
});

export default adminSlice.reducer;
