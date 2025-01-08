import { store } from "@/store";
import { addIncomingMessage } from "@/store/slices/chat.slice";
import { setConnected, setOnlineUsers } from "@/store/slices/socket.slice";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (userId: string): Socket => {
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

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
