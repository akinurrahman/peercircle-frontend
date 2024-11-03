// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { LoginSchemaType } from "@/validations/auth.schema";
// import { loginApi } from "@/services/apis/auth";

// // Define the login thunk
// export const loginUser = createAsyncThunk<
//   any, // Type of the returned value on success
//   LoginSchemaType, // Type of the argument
//   { rejectValue: string } // Type for the rejected value
// >("auth/login", async (data: LoginSchemaType, { rejectWithValue }) => {
//   try {
//     const response = await loginApi(data);
//     return response; // Expect this to return the user data
//   } catch (error: any) {
//     // Use 'any' to simplify the error type for now
//     return rejectWithValue(error.response?.data?.message || "Login failed"); // Ensure you're accessing the correct property
//   }
// });
