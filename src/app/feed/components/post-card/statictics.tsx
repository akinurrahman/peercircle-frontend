import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, Heart, MessageCircle, Send, Smile } from "lucide-react";
import React from "react";
import { Post } from "../../hooks/useFetchPosts";

interface StaticticsProps {
  post: Post;
}

const Statictics: React.FC<StaticticsProps> = ({ post }) => {
  return (
    <CardFooter className="flex flex-col items-start p-4">
      <div className="mb-2 flex w-full justify-between">
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {}}
                  className={true ? "text-red-500" : ""}
                >
                  <Heart
                    className="h-6 w-6"
                    fill={true ? "currentColor" : "none"}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{true ? "Unlike" : "Like"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Send className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {}}
                className={true ? "text-yellow-500" : ""}
              >
                <Bookmark
                  className="h-6 w-6"
                  fill={true ? "currentColor" : "none"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{true ? "Unsave" : "Save"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* <p className="text-sm font-semibold mb-1">{post.likes.length.toLocaleString()} likes</p> */}
      <p className="text-sm">
        {/* <span className="font-semibold">{post.author.username} </span> */}
        {post.caption}
      </p>
      <Button
        variant="link"
        className="h-auto p-0 text-xs text-muted-foreground"
      >
        {/* View all {post.comments.length} comments */}
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
      {/* {post.comments.slice(0, 2).map((comment) => (
              <p key={comment.id} className="text-sm">
                  <span className="font-semibold">{comment.author} </span>
                  {comment.text}
              </p>
          ))} */}

      <Separator className="my-4" />
      <div className="flex w-full items-center">
        <Avatar className="mr-2 h-8 w-8">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Your Avatar" />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Add a comment..."
          value={"asdf"}
          onChange={() => {}}
          className="flex-grow border-none bg-transparent text-sm"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
