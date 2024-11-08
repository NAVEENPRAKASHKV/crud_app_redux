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
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, thunkAPI) => {
    try {
      console.log("user asyc");
      const state = thunkAPI.getState();
      const response = await api.delete(`admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${state.admin.token}`,
        },
      });
      return userId;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "an Error occured";
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);
export const createUser = createAsyncThunk(
  "admin/create",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const response = await api.post("admin/users/create", userData, {
        headers: {
          Authorization: `Bearer ${state.admin.token}`,
        },
      });
      console.log("creted user", response.data);
      alert("User Profile created");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "an Error occured";
      alert(`error :${errorMessage}`);
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (user, thunkAPI) => {
    try {
      const response = await api.put(`/api/users/${user.id}`, user, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      // return  response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "an Error occured";
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState = {
  selectedUser: null,
  usersInfo: [],
  token: localStorage.getItem("userToken") || null,
  loading: false,
  error: null,
  token: null, // Make sure the token is stored here for use in headers
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.usersInfo = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersInfo = state.usersInfo.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersInfo.push(action.payload);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        const index = state.usersInfo.findIndex(
          (user) => user._id === action?.payload?._id
        );
        if (index !== -1) state.usersInfo[index] = action.payload;
        else state.usersInfo.push(action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      });
  },
});
export const { setSelectedUser } = adminSlice.actions;
export default adminSlice.reducer;
