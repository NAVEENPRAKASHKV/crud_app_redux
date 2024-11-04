import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "userDetails",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export default userSlice;
