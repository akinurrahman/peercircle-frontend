import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { feedApis } from "@/services/apis/feed/feed.api";
import { Post } from "../type";

export const useBookMarkToggle = (post: Post) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(post?.isBookmarked);

  useEffect(() => {
    setIsBookmarked(post?.isBookmarked);
  }, [post]);
  const toggleBookMark = async () => {
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);
    try {
      const response = await feedApis.toggleBookmark.updateOne(post._id, {});
      setIsBookmarked(response?.isBookmarked);
    } catch (error) {
      setIsBookmarked(previousState);
      toast.error(getErrorMessage(error));
    }
  };

  return { isBookmarked, toggleBookMark };
};
