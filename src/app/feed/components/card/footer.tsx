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
import { useComments } from "../../hooks/useComments";
import { Post, Product } from "../../type";
import BuyNow from "./buy-now";
import CommentModal from "./comment-modal";

interface Props {
  item: Post | Product;
  type: "post" | "product";
}

const Footer: React.FC<Props> = ({ item, type }) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  // const { isBookmarked, toggleBookMark } = useBookMarkToggle(item);
  // const { isLiked, likeCount, toggleLike } = useLikeToggle(item);
  const { commentInput, setCommentInput, addComment } = useComments();

  const { fullName, profilePicture } = useSelector(
    (state: RootState) => state.profile.basicProfile
  );
  return (
    <CardFooter className="flex flex-col items-start p-4">
      <div className="mb-2 flex w-full justify-between">
        <div className="flex space-x-2">
          <TooltipWrapper content={true ? "Unlike" : "Like"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={()=>{}}
              className={true ? "text-red-500" : ""}
            >
              <Heart
                className="size-6"
                fill={true ? "currentColor" : "none"}
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
        {type === "post" ? (
          <TooltipWrapper content={true ? "Unsave" : "Save"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={()=>{}}
              className={true ? "text-yellow-500" : ""}
            >
              <Bookmark
                className="size-6"
                fill={true ? "currentColor" : "none"}
              />
            </Button>
          </TooltipWrapper>
        ) : (
          <BuyNow profileId={item.author?._id} />
        )}
      </div>
      <p className="mb-1 text-sm font-semibold">{"55"} likes</p>
      <p className="text-sm">
        <span className="font-semibold">{item?.author.username} </span>
        {/* {item.caption || item.name} */}
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
          onClick={() => addComment(item._id)}
        >
          Post
        </Button>
      </div>
    </CardFooter>
  );
};

export default Footer;
