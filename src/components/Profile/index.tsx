import React from "react";
import ProfileHeader from "./profile-header";

const Profile = ({ isPersonalView }: any) => {
  return (
    <div className="">
      <ProfileHeader isPersonalView={isPersonalView} />
    </div>
  );
};

export default Profile;
