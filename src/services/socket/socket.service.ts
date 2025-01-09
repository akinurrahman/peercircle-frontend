import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { store } from "@/store";
import { setConnected } from "@/store/slices/socket.slice";

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    const userId = Cookies.get("id");
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
