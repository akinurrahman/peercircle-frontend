import { store } from "@/store";
import { setOnlineUsers } from "@/store/slices/socket.slice";
import { Socket } from "socket.io-client";


export const handleUserSocketEvents = (socket: Socket) => {
  socket.on("getOnlineUsers", (onlineUsers) => {
    store.dispatch(setOnlineUsers(onlineUsers));
  });
};
