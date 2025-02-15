import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppDispatch, RootState } from "@/store";
import { fetchConversations } from "@/store/slices/conversation.slice";
import { getInitials } from "@/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";

const LeftPannel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, loading } = useSelector(
    (state: RootState) => state.conversation
  );

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <div className="h-full border-r bg-background">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-2 p-4">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            : conversations?.map(
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

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-muted/50 focus:bg-muted/50">
      <Skeleton className="size-12 rounded-full" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="size-5 rounded-full" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};
