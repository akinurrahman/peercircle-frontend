import { feedApis } from "@/services/apis/feed/feed.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface Post {
  _id: string;
  caption?: string;
  mediaUrls: string[];
  likeCount: number;
  authorName: string;
  authorId: string;
  isMine: boolean;
  isLikedByMe: boolean;
  username: string;
  profilePicture: string;
  commentCount: number;
  isFollowing: boolean;
  isBookmarkedByMe: boolean;
}

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await feedApis.posts.getAll();
      setPosts(res.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { isLoading, posts };
};
