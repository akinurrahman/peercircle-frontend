"use client";

import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import PostCard from "../components/post-card";
import { useFetchPosts } from "../hooks/useFetchPosts";
import PostSkeleton from "../components/post-card/post-skeleton";

const Posts: React.FC = () => {
  const { isLoading, posts } = useFetchPosts();

  if (isLoading) {
    return (
      <div className="mx-auto my-5 max-w-xl px-4 py-8">
        {[...Array(10)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default Posts;
