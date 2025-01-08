import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { store } from "@/store";
import { setConnected, setOnlineUsers } from "@/store/slices/socket.slice";
import { addIncomingMessage } from "@/store/slices/chat.slice";

const userId = Cookies.get("id");

let socket: Socket | null = null;

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

    socket.on("newMessage", (message) => {
      store.dispatch(addIncomingMessage(message));
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;

// Utility functions to emit socket events safely
export const joinChat = (conversationId: string) => {
  if (socket) {
    socket.emit("joinChat", { userId, conversationId });
  } else {
    console.error("Socket is not connected!");
  }
};

export const leaveChat = () => {
  if (socket) {
    socket.emit("leaveChat", { userId });
  } else {
    console.error("Socket is not connected!");
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
