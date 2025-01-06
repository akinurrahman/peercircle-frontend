import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { messageApis } from "@/services/apis/message/message.api";
import { RootState } from "@/store";
import { getInitials } from "@/utils";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface User {
  conversationId: string;
  userId: string;
  fullName: string;
  username: string;
  profilePicture?: string;
}

const LeftPannel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { onlineUsers } = useSelector((state: RootState) => state.socket);

  const getAllConversations = async () => {
    try {
      const response = await messageApis.conversations.getAll();
      setUsers(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getAllConversations();
  }, []);
  return (
    <div className="space-y-4 p-6">
      {users?.map(({userId,profilePicture,fullName,username}) => {
        const isOnline = onlineUsers.includes(userId);
        return (
          <div key={userId}>
            <Link
              href={`/messages/${userId}`}
              className="flex items-center space-x-3"
            >
              <Avatar>
                <AvatarImage
                  src={profilePicture}
                  alt={fullName}
                  className="object-cover"
                />
                <AvatarFallback>
                  {getInitials(fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="grow">
                <p className="font-medium">{fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {username}
                </p>
              </div>
              <Badge
                variant={isOnline ? "success" : "secondary"}
                className="text-xs"
              >
                {isOnline ? "Online" : "Offline"}
              </Badge>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LeftPannel;
