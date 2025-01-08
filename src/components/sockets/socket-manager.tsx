"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import {
  initializeSocket,
  disconnectSocket,
} from "@/services/socket/socket.service";

const SocketManager = () => {
  useEffect(() => {
    const userId = Cookies.get("id");
    if (userId) {
      initializeSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, []);

  return null; // No UI needed
};

export default SocketManager;
