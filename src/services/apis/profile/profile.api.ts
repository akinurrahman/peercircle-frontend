import generateApis from "@/services/generate.api";

export const profileApis = {
  profile: generateApis("/profile"),
  followUnfollow: generateApis("/toggle-follow-unfollow"),
  checkUsernameAvailability: generateApis("/check-username"),
};

