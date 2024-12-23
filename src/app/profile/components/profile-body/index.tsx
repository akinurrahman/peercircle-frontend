"use client";

import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import TabsHeader from "./TabsHeader";
import PostsGrid from "./PostsGrid";
import ProductsGrid from "./ProductsGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProfileContent({ profileId }: { profileId?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryTab = searchParams.get("tab") || "posts";
  const [activeTab, setActiveTab] = useState(queryTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  useEffect(() => {
    if (queryTab !== activeTab) {
      setActiveTab(queryTab);
    }
  }, [queryTab, activeTab]);
  return (
    <div className="h-full flex-1 px-4 pb-20">
      <div className="mx-auto w-full max-w-4xl">
        <Tabs
          defaultValue={queryTab}
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsHeader />
          {activeTab === "posts" && <PostsGrid profileId={profileId} />}
          {activeTab === "products" && <ProductsGrid profileId={profileId} />}
        </Tabs>
      </div>
    </div>
  );
}
