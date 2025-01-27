"use client";

import React from "react";

import PostCard from "../components/post-card";
import PostSkeleton from "../components/post-card/post-skeleton";
import { useFetchPosts } from "../hooks/useFetchPosts";

const Posts = () => {
  const { isLoading, posts } = useFetchPosts();

  if (isLoading) {
    return (
      <div className="mx-auto my-5 max-w-lg px-4 py-8">
        {[...Array(10)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default Posts;
