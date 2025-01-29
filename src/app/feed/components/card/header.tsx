import React, { useEffect, useState } from "react";
import { Post, Product } from "../../type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { profileApis } from "@/services/apis/profile/profile.api";

interface Props {
  item: Post | Product;
}

const Header: React.FC<Props> = ({ item }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(item?.isFollowing);
  useEffect(() => {
    setIsFollowing(item?.isFollowing);
  }, [item]);

  const toggleIsFollowing = async () => {
    try {
      const response = await profileApis.followUnfollow.updateOne(
        item.author._id,
        {
          isFollowing: !isFollowing,
        }
      );
      setIsFollowing(response?.isFollowing);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <CardHeader className="flex flex-row items-center space-y-0 p-4">
      <Link href={item.isMine ? "/profile" : `/profile/${item.author._id}`}>
        <Avatar className="size-10 cursor-pointer border-2 border-primary">
          <AvatarImage
            src={item.author.profilePicture}
            alt={`${item.author.fullName}'s avatar`}
          />
          <AvatarFallback>{getInitials(item?.author.fullName)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="ml-3 flex grow">
        <div>
          <p className="text-sm font-semibold">{item.author.fullName}hello</p>
          <p className="text-xs text-muted-foreground">
            @{item.author.username}
          </p>
        </div>
        <div className={`${item.isMine ? "ml-4 block" : "hidden"}`}>
          <Badge>Author</Badge>
        </div>
      </div>
      {!item.isMine && (
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          onClick={toggleIsFollowing}
          className="ml-auto mr-2"
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>More options</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardHeader>
  );
};

export default Header;
