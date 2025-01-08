"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppDispatch, RootState } from "@/store";
import { fetchMessages } from "@/store/slices/chat.slice";
import { getInitials } from "@/utils";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MessageHeader = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { onlineUsers } = useSelector((state: RootState) => state.socket);
  // const { receiverInfo } = useSelector((state: RootState) => state.chat);

  return (
    <div className="flex items-center justify-between border-b border-border p-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="size-12">
            <AvatarImage
              // src={receiverInfo.profilePicture}
              // alt={receiverInfo.fullName}
              className="object-cover"
            />
            <AvatarFallback>
              {/* {getInitials(receiverInfo.fullName)} */}
            </AvatarFallback>
          </Avatar>
          <div
          // className={`absolute bottom-0 right-0 block size-3 rounded-full ring-1 ring-white ${onlineUsers.includes(receiverInfo?._id || "") ? "bg-green-500" : "bg-red-500"}`}
          ></div>
        </div>
        <div>
          {/* <h2 className="text-lg font-semibold">{receiverInfo.fullName}</h2> */}
          <p className="text-sm text-muted-foreground">
            {/* @{receiverInfo.username} */}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MessageHeader;
