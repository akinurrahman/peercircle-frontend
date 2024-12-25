import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PostSkeleton = () => {
  return (
    <Card className="mb-6 w-full border-none shadow-md">
      <CardHeader className="flex flex-row items-center space-y-0 p-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="ml-3 grow">
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="ml-auto mr-2 h-8 w-20" />
        <Skeleton className="size-8 rounded-full" />
      </CardHeader>

      <CardContent className="p-0">
        <Skeleton className="aspect-square w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="mb-2 flex w-full justify-between">
          <div className="flex space-x-2">
            {[1, 2, 3].map((_, index) => (
              <Skeleton key={index} className="h-8 w-8 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="mb-1 h-4 w-24" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-1 h-4 w-3/4" />
        <Skeleton className="mb-4 h-3 w-32" />
        {[1, 2].map((_, index) => (
          <Skeleton key={index} className="mb-1 h-4 w-full" />
        ))}
        <Separator className="my-4" />
        <div className="flex w-full items-center">
          <Skeleton className="mr-2 h-8 w-8 rounded-full" />
          <Skeleton className="h-8 flex-grow" />
          <Skeleton className="ml-2 h-8 w-8 rounded-full" />
          <Skeleton className="ml-2 h-8 w-16" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostSkeleton;
