import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: {
    _id: "",
    username: "",
    fullName: "",
    email: "",
    profilePicture: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setEmail: (state, action) => {
      state.user.email = action.payload;
    },

    logout(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, setUser, setEmail, logout } = authSlice.actions;

export default authSlice.reducer;
