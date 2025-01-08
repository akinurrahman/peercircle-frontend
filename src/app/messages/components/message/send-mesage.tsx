"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messageApis } from "@/services/apis/message/message.api";
import { AppDispatch } from "@/store";
import { appendMessage } from "@/store/slices/chat.slice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const SendMessage = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        const res = await messageApis.message.create({
          conversationId: params.id,
          message: newMessage,
        });
        dispatch(appendMessage(res));
        setNewMessage("");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };
  return (
    <div className="bg-background p-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default SendMessage;
