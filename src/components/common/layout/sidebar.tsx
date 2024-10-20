"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarItem, sidebarItems } from "@/constants/sidebardata.constant";
import { ModeToggle } from "./mode-toggler";
import { useTheme } from "next-themes";
import { imageConstant } from "@/constants/images.constant";
import Image from "next/image";

const SidebarButton = ({
  item,
  isActive,
  level = 0,
}: {
  item: SidebarItem;
  isActive: boolean;
  level?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { icon: Icon, label, href, subitems } = item;
  const hasSubitems = subitems && subitems.length > 0;

  const buttonClasses = `
    justify-start w-full flex items-center py-6 px-4 my-1 rounded-lg transition-all duration-200 ease-in-out
    ${isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-primary/5 hover:text-primary"}
    ${level > 0 ? "ml-4" : ""}
  `;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            {hasSubitems ? (
              <Button
                variant="ghost"
                className={buttonClasses}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icon className="mr-3 size-5" />
                <span className="grow text-left text-sm">{label}</span>
                {isOpen ? (
                  <ChevronDown className="size-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="size-4 transition-transform duration-200" />
                )}
              </Button>
            ) : (
              <Link href={href} passHref>
                <Button variant="ghost" className={buttonClasses}>
                  <Icon className="mr-3 size-5" />
                  <span className="grow text-left text-sm">{label}</span>
                </Button>
              </Link>
            )}
            {isOpen && hasSubitems && (
              <div className="ml-4 mt-1 space-y-1">
                {subitems.map((subitem, index) => (
                  <SidebarButton
                    key={index}
                    item={subitem}
                    isActive={false}
                    level={level + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

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
          <Avatar className="size-10 transition-transform duration-200 ease-in-out hover:scale-110">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">John Doe</p>
            <p className="truncate text-xs text-muted-foreground">
              john@example.com
            </p>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
