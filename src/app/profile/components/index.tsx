import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./profile-body";

interface ProfileProps {
  isPersonalView: boolean;
  profileId?: string;
}

const Profile: React.FC<ProfileProps> = ({ isPersonalView, profileId }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background px-4">
      <ProfileHeader isPersonalView={isPersonalView} profileId={profileId} />
      <ProfileContent profileId={profileId} />
    </div>
  );
};

export default Profile;
