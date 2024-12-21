import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";

interface FeedProps {
  type?: "all" | "posts" | "shop";
}

function Feed({ type = "all" }: FeedProps) {
  return (
    <div className="space-y-4 pb-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i} className="rounded-lg border">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Author" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Author Name</p>
                  <p className="text-sm text-muted-foreground">@username</p>
                </div>
                <div className="flex items-center gap-2">
                  {type !== "posts" && <p className="font-semibold">$99.00</p>}
                  <Button variant="secondary" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg"
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Heart className="mr-2 size-4" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 size-4" />
                Comment
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 size-4" />
                Share
              </Button>
            </div>
            {type !== "posts" && (
              <Button variant="default" size="sm">
                Buy Now
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Feed;
