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
  _id: string;
  participants: {
    _id: string;
    fullName: string;
    username: string;
    profilePicture: string;
  };
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
      {users?.map((user) => {
        const isOnline = onlineUsers.includes(user.participants?._id);
        return (
          <div key={user._id}>
            <Link
              href={`/messages/${user.participants?._id}`}
              className="flex items-center space-x-3"
            >
              <Avatar>
                <AvatarImage
                  src={user.participants?.profilePicture}
                  alt={user.participants?.fullName}
                  className="object-cover"
                />
                <AvatarFallback>
                  {getInitials(user.participants?.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="grow">
                <p className="font-medium">{user.participants?.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {user.participants?.username}
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
