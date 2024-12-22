"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { sidebarItems } from "@/constants/sidebardata.constant";
import { ModeToggle } from "./mode-toggler";
import { useTheme } from "next-themes";
import { imageConstant } from "@/constants/images.constant";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchBasicProfileInfo } from "@/store/slices/profile/profile.slice";
import SidebarButton from "./sidebar-button";

export default function Sidebar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [logoSrc, setLogoSrc] = useState(imageConstant.logo);

  useEffect(() => {
    setLogoSrc(isDark ? imageConstant.darkModeLogo : imageConstant.logo);
  }, [isDark]);

  return (
    <div className="flex h-full flex-col border-r bg-background text-foreground">
      <div className="flex items-center justify-center p-6">
        <Image
          src={logoSrc}
          width={156}
          height={45}
          alt="Logo"
          className="h-8"
        />
      </div>
      <ScrollArea className="grow px-3">
        <nav className="space-y-1 py-4">
          {sidebarItems.map((item, index) => (
            <SidebarButton
              key={index}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3 transition-all duration-200 ease-in-out hover:bg-muted/70">
          {/* <Avatar className="size-10 transition-transform duration-200 ease-in-out hover:scale-110">
            <AvatarImage
              src={profile?.profile_picture}
              alt={profile?.full_name}
            />
            <AvatarFallback>
              {profile?.full_name
                ? profile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "?"}
            </AvatarFallback>
          </Avatar> */}
          <div className="min-w-0 flex-1">
            {/* <p className="truncate text-sm font-medium">{profile?.full_name}</p> */}
            <p className="truncate text-xs text-muted-foreground">
              {/* {profile?.username} */}
            </p>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
