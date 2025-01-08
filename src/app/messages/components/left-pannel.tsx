import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messageApis } from "@/services/apis/message/message.api";
import { getInitials } from "@/utils";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  userId: string;
  fullName: string;
  username: string;
  profilePicture?: string;
  conversationId?: string;
  unseenCount: number;
}

const LeftPannel = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getAllConversations = async () => {
    try {
      const response = await messageApis.conversation.getAll();
      setUsers(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getAllConversations();
  }, []);
  return (
    <div className="h-full border-r bg-background">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-2 p-4">
          {users?.map(
            ({
              profilePicture,
              fullName,
              username,
              conversationId,
              unseenCount,
            }) => (
              <Link
                key={conversationId}
                href={`/messages/${conversationId}`}
                className="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-muted/50 focus:bg-muted/50"
              >
                <Avatar className="size-12">
                  <AvatarImage
                    src={profilePicture}
                    alt={fullName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-foreground">
                      {fullName}
                    </p>
                    {unseenCount > 0 && (
                      <div className="relative flex items-center">
                        <div className="absolute -right-1 -top-1">
                          <Badge
                            variant="secondary"
                            className="flex size-5 items-center justify-center rounded-full bg-primary p-0 text-xs font-semibold text-primary-foreground"
                          >
                            {unseenCount}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {username}
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeftPannel;
