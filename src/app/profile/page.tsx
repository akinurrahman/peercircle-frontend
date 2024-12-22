import LayoutWrapper from "@/components/layout/user-feed-layout";
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
