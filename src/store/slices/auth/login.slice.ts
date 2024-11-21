import http from "@/services/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { LoginSchemaType } from "@/validations/auth.schema";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  user: null,
  error: null,
};

const baseUrl = "/api/user";

// Create async thunk for login
export const loginApi = createAsyncThunk(
  "auth/login",
  async (data: LoginSchemaType, { rejectWithValue }) => {
    try {
      const response = await http.post(`${baseUrl}/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Create slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null; // Action to reset the error state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.fulfilled, (state, action: PayloadAction<any>) => {
      state.user = action.payload; // Store user data on success
    });
  },
});

// Export actions and reducer
export const { resetError } = loginSlice.actions;
export default loginSlice.reducer;
