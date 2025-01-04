"use client";
import LayoutWrapper from "@/components/common/layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { ReactNode } from "react";
import LeftPannel from "./components/left-pannel";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  // const isMessageDetailPage = pathname.includes('messages')
  return (
    <LayoutWrapper showRightSidebar={false}>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border border-none md:min-w-[450px]"
      >
        <ResizablePanel
          className={`${pathname !== "/messages" && "hidden md:block"} max-w-md`}
        >
          <LeftPannel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          className={`${pathname === "/messages" && "hidden md:block"}`}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </LayoutWrapper>
  );
};

export default Layout;
