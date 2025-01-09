import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { store } from "@/store";
import { setConnected, setOnlineUsers } from "@/store/slices/socket.slice";
import { appendMessage } from "@/store/slices/message.slice";
import { incrementUnseenCount, resetUnseenCount } from "@/store/slices/conversation.slice";

const userId = Cookies.get("id");

let socket: Socket | null = null;

let activeConversationId: string | null = null; // Track the currently active conversation

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_BASE_URL, {
      query: { userId },
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      store.dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      store.dispatch(setConnected(false));
    });

    socket.on("getOnlineUsers", (onlineUsers) => {
      store.dispatch(setOnlineUsers(onlineUsers));
    });

    // Handle new messages
    socket.on("newMessage", (message) => {
      const { conversationId } = message;

      // Append the message to the store
      store.dispatch(appendMessage(message));

      // Check if the user is in the active conversation
      if (activeConversationId !== conversationId) {
        // Increment unseen count for the conversation
        store.dispatch(incrementUnseenCount({ conversationId }));
      }
    });
  }
  return socket;
};

// Set the active conversation (when user views a conversation)
export const setActiveConversation = (conversationId: string | null) => {
  activeConversationId = conversationId;

  if (conversationId) {
    // Reset unseen count for this conversation
    store.dispatch(resetUnseenCount({ conversationId }));
  }
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
