"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { authApis } from "@/services/apis/auth/user.api";
import { getInitials } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  _id: string;
  fullName: string;
  username: string;
  profilePicture: string;
}

export default function SuggestedUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onlineUsers } = useSelector((state: RootState) => state.socket);

  const getSuggestedUsers = async () => {
    try {
      setIsLoading(true);
      const response = await authApis.suggestedUsers.getAll();
      setUsers(response?.suggestedUsers);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSuggestedUsers();
  }, []);

  if (isLoading) {
    return <SuggestedUsersSkeleton />;
  }

  return (
    <div className="bg-background p-4">
      <h2 className="mb-4 text-lg font-semibold">Suggested Users</h2>
      <div className="space-y-4">
        {users?.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          return (
            <div key={user._id} className="flex items-center space-x-3">
              <Link href={`/profile/${user._id}`}>
                <Avatar>
                  <AvatarImage
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="object-cover"
                  />
                  <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="grow">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
              <div
                className={`size-2 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SuggestedUsersSkeleton() {
  return (
    <div className="bg-background p-4">
      <Skeleton className="mb-4 h-6 w-1/3" />
      <div className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="grow">
              <Skeleton className="mb-2 h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="size-2 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
