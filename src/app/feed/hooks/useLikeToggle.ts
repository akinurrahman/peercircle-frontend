import { feedApis } from "@/services/apis/feed/feed.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Post } from "../type";

export const useLikeToggle = (post: Post) => {
  const [isLiked, setIsLiked] = useState<boolean>(post?.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post?.likeCount);
  useEffect(() => {
    setIsLiked(post?.isLiked);
    setLikeCount(post?.likeCount);
  }, [post]);

  const toggleLike = async () => {
    const previousState = isLiked;
    setIsLiked(!isLiked);
    try {
      const response = await feedApis.toggleLike.updateOne(post._id, {});
      setIsLiked(response?.isLiked);
      setLikeCount(response?.likeCount);
    } catch (error) {
      setIsLiked(previousState);
      toast.error(getErrorMessage(error));
    }
  };

  return { isLiked, likeCount, toggleLike };
};
