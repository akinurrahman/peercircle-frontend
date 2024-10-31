import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";

export default function PostsSection() {
  const posts = [
    {
      id: 1,
      content:
        "Just finished my final project for CS301! 🎉 Check out this cool visualization I made!",
      likes: 15,
      comments: 3,
      media: {
        type: "image",
        src: "/placeholder.svg?height=400&width=600",
        alt: "Data visualization",
      },
    },
    {
      id: 2,
      content:
        "Anyone interested in forming a study group for the upcoming Algorithms exam?",
      likes: 8,
      comments: 7,
    },
    // Add more posts as needed
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden rounded-xl transition-shadow duration-300 hover:shadow-lg">
            <CardContent className="p-0">
              {post.media && (
                <div className="relative h-48">
                  <Image
                    src={post.media.src}
                    alt={post.media.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="mb-4 text-base">{post.content}</p>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-red-500"
                    >
                      <Heart className="mr-1 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-blue-500"
                    >
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-green-500"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
