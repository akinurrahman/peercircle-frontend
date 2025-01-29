import { feedApis } from "@/services/apis/feed/feed.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Post, Product } from "../type";

export const useLikeToggle = (item: Post | Product) => {
  const [isLiked, setIsLiked] = useState<boolean>(item?.isLiked);
  const [likeCount, setLikeCount] = useState<number>(item?.likeCount);
  useEffect(() => {
    setIsLiked(item?.isLiked);
    setLikeCount(item?.likeCount);
  }, [item]);

  const toggleLike = async (refType: "Post" | "Product") => {
    const previousState = isLiked;
    setIsLiked(!isLiked);
    try {
      const response = await feedApis.toggleLike.updateOne(item._id, {
        refType,
      });
      setIsLiked(response?.isLiked);
      setLikeCount(response?.likeCount);
    } catch (error) {
      setIsLiked(previousState);
      toast.error(getErrorMessage(error));
    }
  };

  return { isLiked, likeCount, toggleLike };
};
