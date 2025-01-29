"use client";
import React from "react";
import Skeleton from "../components/card/skeleton";
import { useFetchPosts } from "../hooks/useFetchPosts";
import PostCard from "../components/card";

const Post = () => {
  const { isLoading, posts } = useFetchPosts();

  if (isLoading) {
    return (
      <div className="mx-auto my-5 max-w-lg px-4 py-8">
        {[...Array(10)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {posts?.map((post) => (
        <PostCard key={post._id} item={post} type="post" />
      ))}
    </div>
  );
};

export default Post;
