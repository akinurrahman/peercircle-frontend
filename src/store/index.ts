import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import modalReducer from "./slices/modal.slice";
import socketReducer from "./slices/socket.slice";
import messageReducer from "./slices/message.slice";
import conversationReducer from "./slices/conversation.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    socket: socketReducer,
    chat: messageReducer,
    conversation: conversationReducer,
  },
});

// Export the store directly for the Provider in RootLayout
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
