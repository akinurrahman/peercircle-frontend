import LayoutWrapper from "@/components/common/layout";
import Profile from "@/app/profile/components";
import React from "react";

const page = () => {
  return (
    <LayoutWrapper showRightSidebar={false}>
      <Profile isPersonalView={true} />
    </LayoutWrapper>
  );
};

export default page;
