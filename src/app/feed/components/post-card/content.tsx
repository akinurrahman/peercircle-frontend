import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { Post } from "../../hooks/useFetchPosts";

interface MainContentProps {
  post: Post;
}

const MainContent: React.FC<MainContentProps> = ({ post }) => {
  return (
    <CardContent className="p-0">
      <Swiper
        modules={[Navigation, Pagination, Zoom]}
        navigation
        pagination={{ clickable: true }}
        zoom={{ maxRatio: 3, minRatio: 1 }}
        className="aspect-square w-full"
      >
        {post.mediaUrls.map((url, index) => (
          <SwiperSlide key={index} className="swiper-zoom-container">
            <Image
              src={url}
              alt={`Post image ${index + 1}`}
              fill
              className="rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </CardContent>
  );
};

export default MainContent;
