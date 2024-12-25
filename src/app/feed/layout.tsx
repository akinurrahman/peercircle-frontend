import LayoutWrapper from "@/components/layout/user-feed-layout";
import React, { ReactNode } from "react";
import { FeedNavigation } from "./FeedNavigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <div className="mx-auto max-w-xl">
        <FeedNavigation />
        {children}
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
