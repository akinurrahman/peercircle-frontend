import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import modalReducer from "./slices/modal.slice";
import profileReducer from "./slices/profile.slice";
import socketReducer from "./slices/socket.slice";
import chatReducer from "./slices/chat.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    profile: profileReducer,
    socket: socketReducer,
    chat: chatReducer,
  },
});

// Export the store directly for the Provider in RootLayout
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
