import LayoutWrapper from "@/components/common/layout";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return <LayoutWrapper showRightSidebar={false}>{children}</LayoutWrapper>;
};

export default layout;
