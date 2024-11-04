import React, { ReactNode } from "react";
import Sidebar from "@/components/common/layout/sidebar";
import { Home, Search, MessageCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutWrapperProps {
  children: ReactNode;
  showRightSidebar?: boolean;
}

export default function LayoutWrapper({
  children,
  showRightSidebar = true,
}: LayoutWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Sidebar - hidden on mobile, visible on md and above */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] overflow-y-auto border-r bg-background md:block lg:w-[275px]">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <main className="flex-1 md:ml-[250px] lg:ml-[275px]">
        <div className="container mx-auto">{children}</div>
      </main>

      {/* Right Sidebar - hidden on mobile, visible on md and above if showRightSidebar is true */}
      {showRightSidebar && (
        <aside className="fixed inset-y-0 right-0 z-20 hidden w-[250px] overflow-y-auto border-l bg-muted md:block lg:w-[275px]">
          <div className="h-full p-4">Right Sidebar Content</div>
        </aside>
      )}

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background p-2 md:hidden">
        <div className="flex justify-around">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Messages</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
