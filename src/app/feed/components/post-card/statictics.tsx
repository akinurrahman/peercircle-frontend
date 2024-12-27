import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import React from "react";
import { Post } from "../../hooks/useFetchPosts";
import { useLikeToggle } from "../../hooks/useLikeToggle";
import { useBookMarkToggle } from "../../hooks/useBookMarkToggle";
import TooltipWrapper from "@/components/common/tooltip-wrapper";

interface StaticticsProps {
  post: Post;
}

const Statictics: React.FC<StaticticsProps> = ({ post }) => {
  const { isLiked, likeCount, toggleLike } = useLikeToggle(post);
  const { isBookmarked, toggleBookMark } = useBookMarkToggle(post);

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
        className={`my-1 h-auto p-0 text-xs text-muted-foreground ${post?.commentCount === 0 ? "hidden" : ""}`}
      >
        View all {post?.commentCount} comments
      </Button>
      {/* <Dialog>
          <DialogTrigger asChild>
            
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ScrollArea className="h-[300px] pr-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <p className="text-sm">
                    <span className="font-semibold">{comment.author} </span>
                    {comment.text}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatTimestamp(comment.createdAt)}</p>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog> */}
      {post.randomComments?.map((comment) => (
        <p key={comment.commentId} className="my-0.5 text-sm">
          <span className="font-medium">{comment.commenterName} </span>
          {comment.text}
        </p>
      ))}

      <Separator className="my-4" />
      <div className="flex w-full items-center">
        <Avatar className="mr-2 size-8">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Your Avatar" />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Add a comment..."
          value={""}
          onChange={() => {}}
          className="grow border-none bg-transparent text-sm"
        />

        <Button
          variant="ghost"
          className="font-semibold text-primary"
          onClick={() => {}}
          disabled={false}
        >
          Post
        </Button>
      </div>
    </CardFooter>
  );
};

export default Statictics;
