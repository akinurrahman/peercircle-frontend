import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Heart } from "lucide-react";
import { Post } from "../../hooks/useFetchPosts";
import { RootState } from "@/store";
import { getInitials } from "@/utils";
import { useComments } from "../../hooks/useComments";
import { Separator } from "@/components/ui/separator";

interface Author {
  _id: string;
  fullName: string;
  username: string;
}

interface Comment {
  _id: string;
  text: string;
  author: Author;
  resourceId: string;
  resourceType: string;
  parentComment: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  nestedComments: Comment[];
}

const CommentsModal: React.FC<{ post: Post }> = ({ post }) => {
  const { commentInput, setCommentInput, addComment } = useComments();
  const { fullName, profilePicture } = useSelector(
    (state: RootState) => state.profile.basicProfile
  );
  const [replyInput, setReplyInput] = useState<string>("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  // Hardcoded comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      _id: "676ed2c20e03563089e412fa",
      text: "Hey What's up",
      author: {
        _id: "676a4493c0b46a963158d9dc",
        fullName: "Jone Doe",
        username: "jone_doe",
      },
      resourceId: "67698f69463940bf7401e702",
      resourceType: "post",
      parentComment: null,
      createdAt: "2024-12-27T16:16:02.850Z",
      updatedAt: "2024-12-27T16:16:02.850Z",
      __v: 0,
      nestedComments: [],
    },
    {
      _id: "676ed2ed0e03563089e41303",
      text: "2nd comment",
      author: {
        _id: "676a4493c0b46a963158d9dc",
        fullName: "Jone Doe",
        username: "jone_doe",
      },
      resourceId: "67698f69463940bf7401e702",
      resourceType: "post",
      parentComment: null,
      createdAt: "2024-12-27T16:16:45.464Z",
      updatedAt: "2024-12-27T16:16:45.464Z",
      __v: 0,
      nestedComments: [
        {
          _id: "676ed3600e03563089e4130c",
          text: "Hey What's up",
          author: {
            _id: "676a4493c0b46a963158d9dc",
            fullName: "Jone Doe",
            username: "jone_doe",
          },
          resourceId: "67698f69463940bf7401e702",
          resourceType: "post",
          parentComment: "676ed2ed0e03563089e41303",
          createdAt: "2024-12-27T16:18:40.381Z",
          updatedAt: "2024-12-27T16:18:40.381Z",
          __v: 0,
          nestedComments: [],
        },
      ],
    },
  ]);

  const handleReplyClick = (commentId: string) => {
    if (activeReplyId === commentId) {
      setActiveReplyId(null);
      setReplyInput("");
    } else {
      setActiveReplyId(commentId);
      setReplyInput("");
    }
  };

  const handleReply = (parentCommentId: string) => {
    if (replyInput.trim()) {
      const newReply: Comment = {
        _id: Date.now().toString(),
        text: replyInput,
        author: {
          _id: "current_user_id",
          fullName: fullName,
          username: "current_username",
        },
        resourceId: post._id,
        resourceType: "post",
        parentComment: parentCommentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
        nestedComments: [],
      };

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === parentCommentId
            ? {
                ...comment,
                nestedComments: [...comment.nestedComments, newReply],
              }
            : comment
        )
      );

      setReplyInput("");
      setActiveReplyId(null);
    }
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      const newComment: Comment = {
        _id: Date.now().toString(),
        text: commentInput,
        author: {
          _id: "current_user_id",
          fullName: fullName,
          username: "current_username",
        },
        resourceId: post._id,
        resourceType: "post",
        parentComment: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
        nestedComments: [],
      };

      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentInput("");
    }
  };

  const CommentComponent: React.FC<{
    comment: Comment;
    isNested?: boolean;
  }> = ({ comment, isNested = false }) => (
    <div className={`space-y-2 ${isNested ? "ml-12 mt-2" : ""}`}>
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`/placeholder.svg?height=32&width=32`}
            alt={comment.author.fullName}
          />
          <AvatarFallback>
            {getInitials(comment.author.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm font-semibold">{comment.author.fullName}</p>
            <p className="mt-1 text-sm">{comment.text}</p>
          </div>
          <div className="mt-2 flex items-center space-x-4">
            <p className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            {!isNested && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs hover:bg-transparent"
                onClick={() => handleReplyClick(comment._id)}
              >
                Reply
              </Button>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      {activeReplyId === comment._id && !isNested && (
        <div className="ml-11 mt-2 flex items-center space-x-2">
          <Input
            placeholder={`Reply to ${comment.author.fullName}...`}
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            className="flex-grow text-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleReply(comment._id)}
            disabled={!replyInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!isNested &&
        comment.nestedComments &&
        comment.nestedComments.map((reply) => (
          <CommentComponent key={reply._id} comment={reply} isNested={true} />
        ))}
    </div>
  );

  return (
    <DialogContent className="h-[90vh] max-h-[600px] w-full max-w-lg overflow-hidden p-0">
      <DialogHeader className="bg-background  px-6 py-4">
        <DialogTitle className="flex items-center text-xl font-semibold">
          <MessageCircle className="mr-2 h-6 w-6" />
          Comments
        </DialogTitle>
      </DialogHeader>
      <div className="flex h-full flex-col bg-red-400">
        <ScrollArea className="flex-grow px-6 py-4">
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentComponent key={comment._id} comment={comment} />
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profilePicture} alt={fullName} />
              <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
            </Avatar>
            <Input
              placeholder="Add a new comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-grow"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddComment}
              disabled={!commentInput.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default CommentsModal;
