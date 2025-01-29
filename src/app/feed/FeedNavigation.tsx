"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, LayoutGrid, ShoppingCart } from "lucide-react";

const routes = [
  // { value: "all", label: "All", path: "/feed", icon: LayoutGrid },
  { value: "posts", label: "Posts", path: "/feed/posts", icon: Grid },
  {
    value: "products",
    label: "Products",
    path: "/feed/products",
    icon: ShoppingCart,
  },
];

export function FeedNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab =
    routes.find((route) => route.path === pathname)?.value || "all";

  const handleTabChange = (value: string) => {
    const route = routes.find((r) => r.value === value);
    if (route) {
      router.push(route.path);
    }
  };

  return (
    <div className="my-4 px-5">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="h-16 justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
          {routes.map((route) => (
            <TabsTrigger
              key={route.value}
              value={route.value}
              className="flex h-full items-center gap-2 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <route.icon className="size-4" />
              <span>{route.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
