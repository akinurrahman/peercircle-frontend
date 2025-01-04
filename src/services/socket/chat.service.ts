import { store } from "@/store";
import { getSocket } from "./socket.service";
import { appendMessage } from "@/store/slices/chat.slice";

export const handleIncomingMessages = () => {
  const socket = getSocket();

  if (!socket) {
    console.log("Socket is not initialized!");
    return;
  }

  // Remove existing listener to avoid duplication
  socket.off("newMessage");

  socket.on("newMessage", (message) => {
    store.dispatch(appendMessage(message));
  });
};
