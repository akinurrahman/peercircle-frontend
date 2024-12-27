"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

import { sidebarItems } from "@/constants/sidebardata.constant";
import { ModeToggle } from "./mode-toggler";
import { useTheme } from "next-themes";
import { imageConstant } from "@/constants/images.constant";
import Image from "next/image";
import SidebarButton from "./sidebar-button";
import { Modal } from "../../post-modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchBasicProfile } from "@/store/slices/profile.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipWrapper from "../tooltip-wrapper";

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [logoSrc, setLogoSrc] = useState(imageConstant.logo);

  useEffect(() => {
    setLogoSrc(isDark ? imageConstant.darkModeLogo : imageConstant.logo);
  }, [isDark]);

  const { basicProfile } = useSelector((state: RootState) => state.profile);
  const { fullName, email, profilePicture, username } = basicProfile || {};
  useEffect(() => {
    dispatch(fetchBasicProfile());
  }, [dispatch]);

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
              isActive={item.href ? pathname?.startsWith(item.href) : false}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <div className="flex items-center space-x-3 rounded-lg bg-muted/50 p-3 transition-all duration-200 ease-in-out hover:bg-muted/70">
          <Avatar className="size-10 transition-transform duration-200 ease-in-out hover:scale-110">
            <AvatarImage
              src={profilePicture}
              alt={fullName}
              className="object-cover"
            />
            <AvatarFallback>
              {fullName
                ? fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{fullName}</p>
            <TooltipWrapper content={email}>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </TooltipWrapper>
          </div>
          <ModeToggle />
        </div>
      </div>
      <Modal />
    </div>
  );
}
