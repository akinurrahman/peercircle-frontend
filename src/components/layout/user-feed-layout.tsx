import React, { ReactNode } from "react";
import Sidebar from "../common/layout/sidebar";
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
      <div className="hidden w-[280px] shrink-0 md:block">
        <Sidebar />
      </div>
      <div className="grow overflow-y-auto">{children}</div>
      {showRightSidebar && (
        <div className="hidden w-[280px] shrink-0 overflow-y-auto bg-red-500 xl:block">
          <div className="p-4">
            <p>hello world</p>
          </div>
        </div>
      )}
    </div>
  );
}
