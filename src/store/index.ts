import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal.slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

// Export the store directly for the Provider in RootLayout
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
