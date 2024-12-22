import React from "react";
import ProfileHeader from "./ProfileHeader";

interface ProfileProps {
  isPersonalView: boolean;
  profileId?: string;
}

const Profile: React.FC<ProfileProps> = ({ isPersonalView, profileId }) => {
  return (
    <div>
      <ProfileHeader isPersonalView={isPersonalView} profileId={profileId} />
    </div>
  );
};

export default Profile;
