"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid } from "lucide-react";

export default function TabsHeader() {
  return (
    <TabsList className="h-16 w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
      <TabsTrigger
        value="posts"
        className="flex h-full items-center gap-2 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-primary data-[state=active]:bg-transparent"
      >
        <Grid className="size-5" />
        <span className="font-semibold">Posts</span>
      </TabsTrigger>
      <TabsTrigger
        value="products"
        className="flex h-full items-center gap-2 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-primary data-[state=active]:bg-transparent"
      >
        <Grid className="size-5" />
        <span className="font-semibold">Products</span>
      </TabsTrigger>
    </TabsList>
  );
}
