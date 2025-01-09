"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppDispatch, RootState } from "@/store";
import { getInitials } from "@/utils";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMessages,
} from "@/store/slices/message.slice";
import { useParams } from "next/navigation";
import { messageApis } from "@/services/apis/message/message.api";
import { setActiveConversation } from "@/services/socket/socket.service";

const MessageScrollArea = () => {
  const myUserId = Cookies.get("id");
  const params = useParams();
  const conversationId = params.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = useSelector((state: RootState) => state.chat.messages);

  useEffect(() => {
    if (conversationId) {
      dispatch(fetchMessages(conversationId));
    }
  }, [conversationId, dispatch]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const markAsSeen = async () => {
      if (conversationId) {
        await messageApis.conversation.updateOne(conversationId as string, {});
      }
    };
    markAsSeen();
  }, [messages, conversationId]);


  useEffect(() => {
    if (conversationId) {
      setActiveConversation(conversationId);
    }
    return () => {
      setActiveConversation(null);
    }
  }, [conversationId]);

  return (
    <div ref={scrollRef} className="grow overflow-y-auto p-4">
      {messages.map((msg) => {
        const isMine = myUserId === msg.senderId;

        return (
          <div
            key={msg.createdAt}
            className={`flex ${isMine ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`flex ${isMine ? "flex-row-reverse" : "flex-row"} items-end`}
            >
              <Avatar className="size-8">
                <AvatarImage
                  src={msg.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback>{getInitials(msg.fullName)}</AvatarFallback>
              </Avatar>
              <div
                className={`mx-2 rounded-lg px-4 py-2 ${isMine ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
              >
                <p>{msg.message}</p>
                <span className="text-xs opacity-50">
                  {moment(msg.createdAt).format("hh:mmA")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageScrollArea;
