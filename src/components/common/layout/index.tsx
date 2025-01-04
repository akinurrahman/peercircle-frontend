import React, { ReactNode } from "react";
import Sidebar from "./sidebar";
import SuggestedUsers from "./suggested-users";
interface LayoutWrapperProps {
  children: ReactNode;
  showRightSidebar?: boolean;
}

export default function LayoutWrapper({
  children,
  showRightSidebar = true,
}: LayoutWrapperProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="hidden w-[280px] shrink-0 lg:block">
        <Sidebar />
      </div>
      <div className="grow overflow-y-auto">{children}</div>
      {showRightSidebar && (
        <div className="hidden w-[330px] shrink-0 overflow-y-auto xl:block">
          <div className="p-4">
            <SuggestedUsers />
          </div>
        </div>
      )}
    </div>
  );
}
