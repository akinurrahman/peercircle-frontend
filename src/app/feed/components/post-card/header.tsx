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
import React from "react";
import { Post } from "../../hooks/useFetchPosts";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  post: Post;
}

const Header: React.FC<HeaderProps> = ({ post }) => {
  return (
    <CardHeader className="flex flex-row items-center space-y-0 p-4">
      <Link href={post.isMine ? "/profile" : `/profile/${post.authorId}`}>
        <Avatar className="size-10 cursor-pointer border-2 border-primary">
          <AvatarImage
            src={post.profilePicture}
            alt={`${post.authorName}'s avatar`}
          />
          <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="ml-3 grow">
        <p className="text-sm font-semibold">{post.authorName}</p>
        <p className="text-xs text-muted-foreground">@{post.username}</p>
      </div>
      {!post.isMine && (
        <Button
          variant={post.isFollowing ? "secondary" : "default"}
          size="sm"
          onClick={() => {}}
          className="ml-auto mr-2"
        >
          {post.isFollowing ? "Following" : "Follow"}
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
