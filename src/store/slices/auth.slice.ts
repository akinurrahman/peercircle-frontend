import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    reset_token: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setResetToken: (state, action) => {
      state.reset_token = action.payload;
    },
  },
});

export const { setEmail, setResetToken } = authSlice.actions;
export default authSlice.reducer;
