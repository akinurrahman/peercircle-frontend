"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ThumbsUp } from "lucide-react";
import moment from "moment";
import { useComments } from "../../hooks/useComments";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getInitials } from "@/utils";

interface ModalProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommentModal({
  postId,
  open,
  onOpenChange,
}: ModalProps) {
  const {
    commentInput,
    setCommentInput,
    addComment,
    comments,
    replyInput,
    setReplyInput,
    fetchComments,
    isFetchingComments,
  } = useComments();

  const { profilePicture, fullName } = useSelector(
    (state: RootState) => state.auth.user
  );

  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    fetchComments(postId);
  }, [postId, fetchComments]);

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
  };

  const submitReply = () => {
    if (replyingTo) {
      addComment(postId, replyingTo);
      setReplyingTo(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-none sm:max-w-[500px]"
        aria-describedby="comments-modal-description"
        aria-labelledby="comments-modal-title"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Comments</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={profilePicture}
                alt="profile picture"
                className="object-cover"
              />
              <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
            </Avatar>
            <Input
              id="new-comment"
              placeholder="Add a comment..."
              className="grow"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button onClick={() => addComment(postId)}>
              <Send size={16} />
            </Button>
          </div>
          <ScrollArea className="h-[400px] w-full pr-4 pt-3">
            {isFetchingComments
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="mb-6 flex items-start space-x-4">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                    </div>
                  </div>
                ))
              : comments?.map((comment) => (
                  <div key={comment._id} className="mb-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={comment.userId.profilePicture}
                          alt={comment.userId.fullName}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {comment.userId.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center">
                          <p className="font-semibold">
                            {comment.userId.fullName}
                          </p>
                          <span className="ml-2 text-xs text-muted-foreground">
                            {moment(comment.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className="text-sm">{comment.comment}</p>
                        <div className="flex items-center space-x-2 text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ThumbsUp size={14} className="mr-1" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => handleReply(comment._id)}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>

                    {replyingTo === comment._id && (
                      <div className="ml-12 mt-2 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="Current User"
                          />
                          <AvatarFallback>CU</AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder="Write a reply..."
                          className="grow"
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                        />
                        <Button onClick={submitReply}>
                          <Send size={16} />
                        </Button>
                      </div>
                    )}

                    {comment.replies?.map((reply) => (
                      <div
                        key={reply._id}
                        className="ml-12 mt-2 flex items-start space-x-4"
                      >
                        <Avatar>
                          <AvatarImage
                            src={reply.userId.profilePicture}
                            alt={reply.userId.fullName}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {reply.userId.fullName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <p className="font-semibold">
                              {reply.userId.fullName}
                            </p>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {moment(reply.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className="text-sm">{reply.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
