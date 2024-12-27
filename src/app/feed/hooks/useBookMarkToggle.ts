import { useEffect, useState } from "react";
import { Post } from "./useFetchPosts";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { feedApis } from "@/services/apis/feed/feed.api";

export const useBookMarkToggle = (post: Post) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    post?.isBookmarkedByMe
  );

  useEffect(() => {
    setIsBookmarked(post?.isBookmarkedByMe);
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
