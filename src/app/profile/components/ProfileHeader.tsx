"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AtSign,
  UserPlus,
  Mail,
  MapPin,
  Link as LinkIcon,
  ExternalLink,
  Share2,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useFetchProfile } from "../hooks/useFetchProfile";
import { EditProfileModal } from "./EditProfileModal";
import { getInitials } from "@/utils";

interface ProfileHeaderProps {
  isPersonalView?: boolean;
  profileId?: string;
}

export default function ProfileHeader({
  isPersonalView = true,
  profileId,
}: ProfileHeaderProps) {
  const {
    profile,
    fetchProfile,
    isLoading,
    toggleFollowUnfollow,
    isFollowing,
  } = useFetchProfile(isPersonalView, profileId);

  const toggleFollow = () => {
    if (!profileId) return;
    toggleFollowUnfollow(profileId);
  };

  if (isLoading || !profile) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Avatar className="size-24 border-4 border-background shadow-lg sm:size-32">
            <AvatarImage
              src={profile?.profilePicture}
              alt={profile?.fullName}
              className="object-cover"
            />
            <AvatarFallback>{getInitials(profile?.fullName)}</AvatarFallback>
          </Avatar>
          <div className="grow text-center sm:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
              <h1 className="text-2xl font-bold sm:text-3xl">
                {profile?.fullName}
              </h1>
            </div>
            <div className="mb-2 flex items-center justify-center text-muted-foreground sm:justify-start">
              <AtSign className="mr-1 size-4" />
              <span className="text-sm sm:text-base">{profile?.username}</span>
            </div>
            <p className="mb-4 max-w-md text-sm text-muted-foreground">
              {profile?.bio}
            </p>
            <div className="mb-4 flex justify-center gap-6 text-sm sm:justify-start">
              <div className="flex items-center">
                <Users className="mr-1 size-4" />
                <span>
                  <strong>{profile?.followers}</strong> followers
                </span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 size-4" />
                <span>
                  <strong>{profile?.following}</strong> following
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
              {profile?.location && (
                <div className="flex items-center">
                  <MapPin className="mr-1 size-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.website_url && (
                <Link
                  href={profile.website_url}
                  className="flex items-center transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="mr-1 size-4" />
                  <span>{new URL(profile.website_url).hostname}</span>
                  <ExternalLink className="ml-1 size-3" />
                </Link>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            {isPersonalView ? (
              <EditProfileModal profile={profile} fetchProfile={fetchProfile} />
            ) : (
              <>
                <Button
                  onClick={toggleFollow}
                  variant={isFollowing ? "secondary" : "default"}
                  size="sm"
                  className="rounded-full"
                >
                  {isFollowing ? "Following" : "Follow"}
                  <UserPlus className="ml-2 size-4" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Mail className="mr-2 size-4" />
                  Message
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Share2 className="mr-2 size-4" />
                      Share Profile
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileHeaderSkeleton() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Skeleton className="size-24 rounded-full sm:size-32" />
          <div className="grow text-center sm:text-left">
            <Skeleton className="mb-2 h-8 w-48" />
            <Skeleton className="mb-2 h-4 w-32" />
            <Skeleton className="mb-4 h-16 w-full max-w-md" />
            <div className="mb-4 flex justify-center gap-6 sm:justify-start">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="size-9 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
