import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ForgotPasswordFormData } from "@/validations/auth.schema";
import http from "@/services/http";
import { setEmail } from "./common.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { AxiosError } from "axios";

// Define types for your state
interface PasswordResetState {
  loading: boolean; // Only for OTP verification
  error: string | null;
  success: boolean;
  email: string | null;
  reset_token: string | null;
}

// Initial state for password reset slice
const initialState: PasswordResetState = {
  loading: false,
  error: null,
  success: false,
  email: null,
  reset_token: null,
};

const baseUrl = "/api/user";

// Forgot password thunk
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: ForgotPasswordFormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await http.post(`${baseUrl}/forgot_password`, {
        user_email: data.email,
      });
      // Dispatch an action to save the email in the state
      dispatch(setEmail(data.email));
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      return rejectWithValue(errorMessage);
    }
  }
);

// OTP verification thunk with loading state
export const verifyForgotPasswordOTP = createAsyncThunk(
  "auth/verifyForgotPasswordOTP",
  async (
    { user_email, otp }: { user_email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await http.post(`${baseUrl}/forgot_otp_verify`, {
        user_email,
        otp,
      });
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      return rejectWithValue(errorMessage);
    }
  }
);

// Reset password thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    {
      new_password,
      confirm_password,
      reset_token,
    }: {
      new_password: string;
      confirm_password: string;
      reset_token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await http.post(`${baseUrl}/set_password`, {
        new_password,
        confirm_password,
        reset_token,
      });
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage(error as AxiosError);
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const ForgotPasswordSlice = createSlice({
  name: "forgot-password",
  initialState,
  reducers: {
    // Reset action to clear success, error messages, and email
    resetState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
      state.email = null; // Reset email as well
    },
  },
  extraReducers: (builder) => {
    builder
      // Forgot password case reducers
      .addCase(forgotPassword.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // OTP verification case reducers
      .addCase(verifyForgotPasswordOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyForgotPasswordOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reset_token = action.payload.reset_token;
      })
      .addCase(verifyForgotPasswordOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Reset password case reducers
      .addCase(resetPassword.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export the setEmail action to manually set email if needed
export const { resetState } = ForgotPasswordSlice.actions;
export default ForgotPasswordSlice.reducer;
