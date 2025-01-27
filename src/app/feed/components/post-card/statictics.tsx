"use client";
import { CardFooter } from "@/components/ui/card";
import React, { useState } from "react";
import { Post } from "../../hooks/useFetchPosts";
import { Button } from "@/components/ui/button";
import CommentModal from "./comment-modal";
import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useBookMarkToggle } from "../../hooks/useBookMarkToggle";
import { useLikeToggle } from "../../hooks/useLikeToggle";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useComments } from "../../hooks/useComments";

interface StaticticsProps {
  post: Post;
}

const Statictics = ({ post }: StaticticsProps) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const { isBookmarked, toggleBookMark } = useBookMarkToggle(post);
  const { isLiked, likeCount, toggleLike } = useLikeToggle(post);
  const { commentInput, setCommentInput, addComment } = useComments();

  const { fullName, profilePicture } = useSelector(
    (state: RootState) => state.auth.user
  );

  return (
    <CardFooter className="flex flex-col items-start p-4">
      <div className="mb-2 flex w-full justify-between">
        <div className="flex space-x-2">
          <TooltipWrapper content={isLiked ? "Unlike" : "Like"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLike}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart
                className="size-6"
                fill={isLiked ? "currentColor" : "none"}
              />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Comment">
            <Button variant="ghost" size="icon">
              <MessageCircle className="size-6" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Share">
            <Button variant="ghost" size="icon">
              <Send className="size-6" />
            </Button>
          </TooltipWrapper>
        </div>
        <TooltipWrapper content={isBookmarked ? "Unsave" : "Save"}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookMark}
            className={isBookmarked ? "text-yellow-500" : ""}
          >
            <Bookmark
              className="size-6"
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </Button>
        </TooltipWrapper>
      </div>
      <p className="mb-1 text-sm font-semibold">{likeCount} likes</p>
      <p className="text-sm">
        <span className="font-semibold">{post?.username} </span>
        {post.caption}
      </p>

      <Button
        variant="link"
        onClick={() => setOpenItemId(post._id)}
        className={`my-1 h-auto p-0 text-xs text-muted-foreground ${
          post?.commentCount === 0 ? "hidden" : ""
        }`}
      >
        View all {post?.commentCount} comments
      </Button>
      {openItemId === post?._id && (
        <CommentModal
          postId={post._id}
          open={true}
          onOpenChange={() => setOpenItemId(null)}
        />
      )}

      <Separator className="my-4" />
      <div className="flex w-full items-center">
        <Avatar className="mr-2 size-8">
          <AvatarImage
            className="object-cover"
            src={profilePicture}
            alt={fullName}
          />
          <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Add a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="grow border-none bg-transparent text-sm"
        />

        <Button
          variant="ghost"
          className="font-semibold text-primary"
          onClick={() => addComment(post._id)}
        >
          Post
        </Button>
      </div>
    </CardFooter>
  );
};

export default Statictics;
