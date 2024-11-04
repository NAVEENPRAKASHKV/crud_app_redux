import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      console.log("inside the createthunk fromdata", userData);
      const response = await api.post("/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("register data", response.data);
      alert("successfull Registration");
      return response.data; // Return the data on success
    } catch (error) {
      console.log("error", error);
      console.log(error.response?.data?.message);
      alert(`Error in registration: ${error.response?.data?.message}`);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Initial state
const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    // Dummy reducer for demonstration
    dummy: (state, action) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Store user info
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      });
  },
});

// Export actions and reducer
export const { dummy } = userSlice.actions;
export default userSlice.reducer;
