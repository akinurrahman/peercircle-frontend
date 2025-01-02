"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setConnected, setOnlineUsers } from "@/store/slices/socket.slice";

const ManageOnlineUsers = () => {
  const userId = Cookies.get("id");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_IO_BASE_URL, {
        query: { userId },
        transports: ["websocket"],
        withCredentials: true,
      });
      dispatch(setConnected(true));

      // list all the events
      socketIo.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketIo.close();
        dispatch(setConnected(false));
      };
    }
  }, [userId, dispatch]);
  return null;
};

export default ManageOnlineUsers;
