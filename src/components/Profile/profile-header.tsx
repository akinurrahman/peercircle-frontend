"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AtSign,
  UserPlus,
  Mail,
  MapPin,
  Calendar,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function ProfileHeader({
  isFollowing = false,
  toggleFollow = () => {},
  isPersonalView = false,
}) {
  const [activeTab, setActiveTab] = useState("posts");

  const userInfo = {
    name: "Jane Doe",
    username: "janedoe",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Frontend developer passionate about creating beautiful and accessible web experiences.",
    location: "San Francisco, CA",
    website: "https://janedoe.com",
    joinDate: "September 2021",
    posts: 142,
    followers: 1337,
    following: 420,
  };

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg sm:h-32 sm:w-32">
            <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
            <AvatarFallback>
              {userInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center sm:text-left">
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
              {userInfo.name}
            </h1>
            <div className="mb-2 flex items-center justify-center text-muted-foreground sm:justify-start">
              <AtSign className="mr-1 h-4 w-4" />
              <span className="text-sm sm:text-base">{userInfo.username}</span>
            </div>
            <p className="mb-4 max-w-md text-sm text-muted-foreground">
              {userInfo.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
              {userInfo.location && (
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{userInfo.location}</span>
                </div>
              )}
              {userInfo.website && (
                <Link
                  href={userInfo.website}
                  className="flex items-center transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="mr-1 h-4 w-4" />
                  <span>{new URL(userInfo.website).hostname}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              )}
              {userInfo.joinDate && (
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Joined {userInfo.joinDate}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex gap-4 sm:mt-0">
            {!isPersonalView && (
              <>
                <Button
                  onClick={toggleFollow}
                  variant={isFollowing ? "secondary" : "default"}
                  size="sm"
                  className="rounded-full"
                >
                  {isFollowing ? "Following" : "Follow"}
                  <UserPlus className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
