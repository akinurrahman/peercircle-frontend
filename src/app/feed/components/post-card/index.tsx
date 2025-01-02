"use client";

import React from "react";

import Header from "./header";
import MainContent from "./content";
import Statictics from "./statictics";
import { Card } from "@/components/ui/card";
import { Post } from "../../hooks/useFetchPosts";

interface PostCardProps {
  post: Post;
  isLoading: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="mb-6 w-full border-none shadow-none">
      <Header post={post} />
      <MainContent post={post} />
      <Statictics post={post} />
    </Card>
  );
};

export default PostCard;
