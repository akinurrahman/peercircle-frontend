import { ERROR_MESSAGE } from "@/constants/common.constant";
import {
  accessTokenCookie,
  refreshTokenCookie,
} from "@/constants/config.constant";
import { authApis } from "@/services/apis/auth/user.api";
import { initializeSocket } from "@/services/socket/socket.service";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
}

export const loginUser = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    const response = await authApis.login.create(data);
    Cookies.set(accessTokenCookie, response.accessToken);
    Cookies.set(refreshTokenCookie, response.refreshToken);
    Cookies.set("id", response.user.id);
    initializeSocket();
    return response.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || ERROR_MESSAGE;
        }
      );
  },
});

export default authSlice.reducer;
