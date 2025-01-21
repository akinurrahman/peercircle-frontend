"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import {
  initializeSocket,
  disconnectSocket,
} from "@/services/socket/socket.service";
import { handleMessageSocketEvents } from "@/services/socket/message.service";
import { handleUserSocketEvents } from "@/services/socket/user.service";

const SocketManager = () => {
  useEffect(() => {
    const userId = Cookies.get("id");
    if (userId) {
      const socket = initializeSocket();

      // Register socket event handlers
      handleMessageSocketEvents(socket);
      handleUserSocketEvents(socket);
    }

    return () => {
      disconnectSocket();
    };
  }, []);

  return null; // No UI needed
};

export default SocketManager;
