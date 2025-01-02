import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal.slice";
import profileReducer from "./slices/profile.slice";
import socketReducer from "./slices/socket.slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    profile: profileReducer,
    socket: socketReducer,
  },
});

// Export the store directly for the Provider in RootLayout
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
