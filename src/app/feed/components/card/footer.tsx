import { CardFooter } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useBookMarkToggle } from "../../hooks/useBookMarkToggle";
import { useLikeToggle } from "../../hooks/useLikeToggle";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Post, Product } from "../../type";
import BuyNow from "./buy-now";
import CommentModal from "./comment-modal";
import { useComments } from "../../hooks/useComments";

interface Props {
  item: Post | Product;
  type: "Post" | "Product";
}

const Footer: React.FC<Props> = ({ item, type }) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");
  const { isBookmarked, toggleBookMark } = useBookMarkToggle(item as Post);

  const { isLiked, likeCount, toggleLike } = useLikeToggle(item);
  const { addComment } = useComments();

  const { fullName, profilePicture } = useSelector(
    (state: RootState) => state.profile.basicProfile
  );

  return (
    <CardFooter className="flex flex-col items-start p-4">
      <div className="mb-2 flex w-full justify-between">
        <div className="flex space-x-2">
          <TooltipWrapper content={isLiked ? "Unlike" : "Like"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleLike(type)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart
                className="size-6"
                fill={isLiked ? "currentColor" : "none"}
              />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Comment">
            <Button variant="ghost" size="icon">
              <MessageCircle className="size-6" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content="Share">
            <Button variant="ghost" size="icon">
              <Send className="size-6" />
            </Button>
          </TooltipWrapper>
        </div>
        {type === "Post" ? (
          <TooltipWrapper content={isBookmarked ? "Unsave" : "Save"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookMark}
              className={isBookmarked ? "text-yellow-500" : ""}
            >
              <Bookmark
                className="size-6"
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </Button>
          </TooltipWrapper>
        ) : (
          <BuyNow profileId={item.author?._id} />
        )}
      </div>
      <p className="mb-1 text-sm font-semibold">{likeCount} likes</p>
      <p className="text-sm">
        <span className="font-semibold">{item?.author.username} </span>
        <span>
          {type === "Post" ? (item as Post).caption : (item as Product).name}
        </span>
        {type === "Product" && (
          <p className="line-clamp-2 text-xs">
            {(item as Product).description}
          </p>
        )}
      </p>

      <Button
        variant="link"
        onClick={() => setOpenItemId(item._id)}
        className={`my-1 h-auto p-0 text-xs text-muted-foreground ${
          item?.commentCount === 0 ? "hidden" : ""
        }`}
      >
        View all {item?.commentCount} comments
      </Button>
      {openItemId === item?._id && (
        <CommentModal
          postId={item._id}
          type={type}
          open={true}
          onOpenChange={() => setOpenItemId(null)}
        />
      )}

      <Separator className="my-4" />
      <div className="flex w-full items-center">
        <Avatar className="mr-2 size-8">
          <AvatarImage
            className="object-cover"
            src={profilePicture}
            alt={fullName}
          />
          <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Add a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="grow border-none bg-transparent text-sm"
        />

        <Button
          variant="ghost"
          className="font-semibold text-primary"
          onClick={() => addComment(commentInput, type, item._id)}
        >
          Post
        </Button>
      </div>
    </CardFooter>
  );
};

export default Footer;
