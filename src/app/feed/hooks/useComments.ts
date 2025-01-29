import { feedApis } from "@/services/apis/feed/feed.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Comment } from "../type";

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isPending, setIsPending] = useState(false);
  const addComment = async (
    text: string,
    refType: "Post" | "Product",
    refId: string
  ) => {
    try {
      const res = await feedApis.comment.create({
        text,
        refType,
        refId,
      });
      setComments([...comments, res]);
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchComments = useCallback(
    async (refType: "Post" | "Product", refId: string) => {
      try {
        setIsPending(true);
        const res = await feedApis.comment.getAll(`/${refType}?refId=${refId}`);
        setComments(res);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return { addComment, comments, fetchComments, isPending };
};
