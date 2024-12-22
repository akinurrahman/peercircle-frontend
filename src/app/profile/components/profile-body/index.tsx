"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import TabsHeader from "./TabsHeader";
import PostsGrid from "./PostsGrid";
import ProductsGrid from "./ProductsGrid";

export default function ProfileContent({ profileId }: { profileId?: string }) {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="h-full flex-1  px-4 pb-20">
      <div className="mx-auto w-full max-w-4xl">
        <Tabs
          defaultValue="posts"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsHeader />
          {activeTab === "posts" && <PostsGrid profileId={profileId} />}
          {/* {activeTab === "products" && <ProductsGrid />} */}
        </Tabs>
      </div>
    </div>
  );
}
