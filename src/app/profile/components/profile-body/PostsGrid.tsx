"use client";

import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { profileApis } from "@/services/apis/profile/profile.api";
import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
  id: string;
  caption?: string;
  mediaUrls: string[];
  createdAt: string;
  updatedAt: string;
  comments: number;
  likes: number;
}

export default function PostsGrid({ profileId }: { profileId?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async (profileId = "") => {
    setIsLoading(true);
    try {
      const response = await profileApis.post.getAll(`?profileId=${profileId}`);
      setPosts(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(profileId);
  }, [profileId]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (posts.length === 0) {
    return <NoPostsFound />;
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className="group relative aspect-square cursor-pointer">
      <Image
        src={post.mediaUrls[0]}
        alt={post.caption || post.mediaUrls[0]}
        width={300}
        height={300}
        className="size-full rounded-md object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex items-center gap-6 text-white">
          <span className="flex items-center gap-2">
            <Heart className="size-5 fill-white" />
            {post.likes}
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="size-5 fill-white" />
            {post.comments}
          </span>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <Skeleton key={index} className="aspect-square w-full" />
      ))}
    </div>
  );
};

const NoPostsFound = () => {
  return (
    <div className="flex-center mt-6 h-40 rounded-md">
      <p className="text-lg text-gray-500">No posts found</p>
    </div>
  );
};
