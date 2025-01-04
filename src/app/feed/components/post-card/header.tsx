import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Post } from "../../hooks/useFetchPosts";
import Link from "next/link";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { profileApis } from "@/services/apis/profile/profile.api";
import { getInitials } from "@/utils";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  post: Post;
}

const Header: React.FC<HeaderProps> = ({ post }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(post?.isFollowing);
  useEffect(() => {
    setIsFollowing(post?.isFollowing);
  }, [post]);

  const toggleIsFollowing = async () => {
    try {
      const response = await profileApis.followUnfollow.updateOne(
        post.authorId,
        {
          isFollowing: !isFollowing,
        }
      );
      setIsFollowing(response?.isFollowing);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <CardHeader className="flex flex-row items-center space-y-0 p-4">
      <Link href={post.isMine ? "/profile" : `/profile/${post.authorId}`}>
        <Avatar className="size-10 cursor-pointer border-2 border-primary">
          <AvatarImage
            src={post.profilePicture}
            alt={`${post.authorName}'s avatar`}
          />
          <AvatarFallback>{getInitials(post?.authorName)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="ml-3 flex grow">
        <div>
          <p className="text-sm font-semibold">{post.authorName}</p>
          <p className="text-xs text-muted-foreground">@{post.username}</p>
        </div>
        <div className={`${post.isMine ? "ml-4 block" : "hidden"}`}>
          <Badge>Author</Badge>
        </div>
      </div>
      {!post.isMine && (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          onClick={toggleIsFollowing}
          className="ml-auto mr-2"
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>More options</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardHeader>
  );
};

export default Header;
