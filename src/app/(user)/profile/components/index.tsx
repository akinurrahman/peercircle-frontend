import React from "react";
import ProfileHeader from "./profile-header";

interface ProfileProps {
  isPersonalView: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isPersonalView }) => {
  return (
    <div>
      <ProfileHeader isPersonalView={isPersonalView} />
    </div>
  );
};

export default Profile;
