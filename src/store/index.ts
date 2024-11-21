import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signupReducer from "./slices/auth/signup.slice";
import forgotPasswordReducer from "./slices/auth/forgot-password.slice";
import commonAuthReducer from "./slices/auth/common.slice";
import loginReducer from "./slices/auth/login.slice";
import profileReducer from "./slices/profile/profile.slice";

const authReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  forgot: forgotPasswordReducer,
  common: commonAuthReducer,
});

const profileReducers = combineReducers({
  profile: profileReducer,
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducers,
  },
});

// Export the store directly for the Provider in RootLayout
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
