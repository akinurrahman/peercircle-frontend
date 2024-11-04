import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignUpSchemaType } from "@/validations/auth.schema";
import http from "@/services/http";
import { setEmail } from "./common.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";

export interface AuthState {
  user: null | { email: string };
  error: null | string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

const baseUrl = "/api/user";

// Async thunk for signing up
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: SignUpSchemaType, { dispatch, rejectWithValue }) => {
    try {
      const response = await http.post(`${baseUrl}/register`, {
        full_name: data.fullName,
        user_email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
      });

      dispatch(setEmail(data.email));

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data: { user_email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await http.post(`${baseUrl}/verify_otp`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const signUpSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "OTP verification failed";
      });
  },
});

export const { clearError } = signUpSlice.actions;
export default signUpSlice.reducer;
