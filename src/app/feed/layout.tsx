import LayoutWrapper from "@/components/common/layout";
import React, { ReactNode } from "react";
import { FeedNavigation } from "./FeedNavigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <div className="mx-auto max-w-lg">
        <FeedNavigation />
        {children}
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
