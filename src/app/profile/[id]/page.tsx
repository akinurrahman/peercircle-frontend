import LayoutWrapper from "@/components/common/layout";
import Profile from "@/app/profile/components";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const page: React.FC<Props> = ({ params }) => {
  return (
    <LayoutWrapper showRightSidebar={false}>
      <Profile isPersonalView={false} profileId={params.id} />
    </LayoutWrapper>
  );
};

export default page;
