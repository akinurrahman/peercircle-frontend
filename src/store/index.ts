import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
});

// Export the store directly for the Provider in RootLayout
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
