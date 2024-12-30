import { Comment } from "@/constants/interface.constant";
import { feedApis } from "@/services/apis/feed/feed.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useComments = () => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [replyInput, setReplyInput] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const addComment = async (postId: string, commentId?: string) => {
    try {
      const response = await feedApis.comment.create({
        postId,
        comment: commentInput,
        commentId,
        reply: replyInput,
      });

      // If it's a reply, find the comment and append the reply
      if (commentId) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...comment.replies, response] }
              : comment
          )
        );
        setReplyInput("");
      } else {
        // If it's a new comment, add it to the comments array
        setComments((prevComments) => [response, ...prevComments]);
        setCommentInput("");
      }

      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchComments = useCallback(async (postId: string) => {
    if (!postId) return;
    try {
      setIsFetchingComments(true);
      const response = await feedApis.comment.getAll(`?postId=${postId}`);
      console.log(response, "response");
      setComments(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsFetchingComments(false);
    }
  }, []);

  return {
    commentInput,
    setCommentInput,
    replyInput,
    setReplyInput,
    addComment,
    fetchComments,
    comments,
    isFetchingComments,
  };
};
