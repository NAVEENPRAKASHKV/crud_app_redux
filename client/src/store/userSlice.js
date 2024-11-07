import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";
// Async thunk for uploading the profile image

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, thunkAPI) => {
    try {
      console.log("updataed user profile");
      const response = await api.post("/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An error occurred"
      );
    }
  }
);
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

// Async thunk for login a user
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/login", userData);
      return response.data;
    } catch (error) {
      alert(`Error in registration: ${error.response?.data?.message}`);
      return thunkAPI.rejectWithValue(
        error.response.data.message || "An error occurred"
      );
    }
  }
);

// Initial state
const initialState = {
  userInfo: null,
  token: localStorage.getItem("userToken") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  role: "user",
  loading: false,
  error: null,
  protectedData: null,
};

// User slice
const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      state.userInfo = null;
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
        state.token = action.payload.token;
        localStorage.setItem("userToken", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Store user info
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.role = action.payload.role;
        localStorage.setItem("userToken", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Store user info
        localStorage.setItem("userToken", action.payload.token);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      });
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
