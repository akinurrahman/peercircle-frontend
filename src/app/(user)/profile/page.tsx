import UserProfile from "@/components/Profile/user-profile";

// For public view
export default function PublicProfilePage() {
  return <UserProfile isPersonalView={false} />;
}

// For personal view
// export default function PersonalProfilePage() {
//   return <UserProfile isPersonalView={true} />
// }
