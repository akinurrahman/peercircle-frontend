"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import generateApis from "@/services/generate.api";
import type { RootState } from "@/store";
import { getInitials } from "@/utils";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { debounce } from "lodash";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { SearchIcon, UserX, Users } from "lucide-react"; // Import icons

interface User {
  _id: string;
  fullName: string;
  username: string;
  profilePicture?: string;
}

const Search = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { onlineUsers } = useSelector((state: RootState) => state.socket);

  const handleInputChange = debounce(async (search: string) => {
    if (search.trim() === "") {
      setUsers([]);
      setHasSearched(false);
      return;
    }

    try {
      setIsPending(true);
      setHasSearched(true);
      const res = await generateApis(`/results`).getAll(
        `?search_query=${search}`
      );
      setUsers(res);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  }, 1000);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={100}>
        <div className="h-full p-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              onChange={(e) => handleInputChange(e.target.value)}
              type="text"
              placeholder="Search by name or username"
              className="pl-10"
            />
          </div>
          <div className="mt-6 bg-background">
            {!hasSearched && (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Users className="mb-2 size-12 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Start typing to search for users
                </p>
              </div>
            )}
            {hasSearched && users.length === 0 && !isPending && (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <UserX className="mb-2 size-12 text-muted-foreground" />
                <p className="text-muted-foreground">No users found</p>
              </div>
            )}
            <div className="space-y-4">
              {isPending
                ? [...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Skeleton className="size-10 rounded-full" />
                      <div className="grow">
                        <Skeleton className="mb-2 h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  ))
                : users?.map((user) => {
                    const isOnline = onlineUsers.includes(user._id);
                    return (
                      <div
                        key={user._id}
                        className="flex items-center space-x-3"
                      >
                        <Link href={`/profile/${user._id}`}>
                          <Avatar>
                            <AvatarImage
                              src={user.profilePicture}
                              alt={user.fullName}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {getInitials(user.fullName)}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="grow">
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.username}
                          </p>
                        </div>
                        <Badge
                          variant={isOnline ? "success" : "secondary"}
                          className="text-xs"
                        >
                          {isOnline ? "Online" : "Offline"}
                        </Badge>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={0} className="hidden" />
    </ResizablePanelGroup>
  );
};

export default Search;
