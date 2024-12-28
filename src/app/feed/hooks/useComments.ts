import { feedApis } from "@/services/apis/feed/feed.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useState } from "react";
import { toast } from "sonner";

export const useComments = () => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [replyInput, setReplyInput] = useState<string>("");

  const addComment = async (postId: string, commentId?: string) => {
    try {
      await feedApis.comment.create({
        postId,
        comment: commentInput,
        commentId,
        reply: replyInput,
      });
      setCommentInput("");
      setReplyInput("");
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchComments = async () => {};

  return {
    commentInput,
    setCommentInput,
    replyInput,
    setReplyInput,
    addComment,
    fetchComments,
  };
};
