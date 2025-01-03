"use client";

import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Post } from "../../hooks/useFetchPosts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MainContentProps {
  post: Post;
}

const MainContent: React.FC<MainContentProps> = ({ post }) => {
  return (
    <CardContent className="p-0">
      <Carousel className="relative w-full">
        <CarouselContent>
          {post.mediaUrls.map((url, idx) => (
            <CarouselItem key={url + idx}>
              <div
                className="relative w-full overflow-hidden rounded-md"
                style={{ paddingBottom: "100%" }}
              >
                <Image
                  src={url}
                  alt={url}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute-y-center left-3 z-10" />
        <CarouselNext className="absolute-y-center right-3 z-10" />
      </Carousel>
    </CardContent>
  );
};

export default MainContent;
