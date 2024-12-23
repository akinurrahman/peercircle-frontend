"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modal.slice";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarItem } from "@/constants/sidebardata.constant";

interface SidebarButtonProps {
  item: SidebarItem;
  isActive: boolean;
  level?: number;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  item,
  isActive,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { icon: Icon, label, href, subitems } = item;
  const hasSubitems = subitems && subitems.length > 0;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (label.toLowerCase() === "logout") {
      handleLogout();
    } else if (label === "Create post") {
      dispatch(openModal({ modalType: "CREATE_POST" }));
    } else if (label === "Sell Product") {
      dispatch(openModal({ modalType: "SELL_PRODUCT" }));
    } else if (hasSubitems) {
      setIsOpen(!isOpen);
    } else if (href) {
      router.push(href);
    }
  };

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
            <Button
              variant="ghost"
              className={buttonClasses}
              onClick={handleClick}
            >
              <Icon className="mr-3 size-5" />
              <span className="grow text-left text-sm">{label}</span>
              {hasSubitems &&
                (isOpen ? (
                  <ChevronDown className="size-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="size-4 transition-transform duration-200" />
                ))}
            </Button>
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

const handleLogout = () => {
  // Add your logout logic here
  console.log("Logging out...");
};

export default SidebarButton;
