import { profileApis } from "@/services/apis/profile/profile.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface Profile {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  followers: number;
  following: number;
  posts: number;
  bio?: string;
  isVerified: boolean;
  location?: string;
  website_url?: string;
  isFollowing?: boolean;
  gender?: "male" | "female" | "other";
}

export const useFetchProfile = (
  isPersonalView: boolean,
  profileId?: string
) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(profile?.isFollowing ?? false);

  const fetchProfile = useCallback(async () => {
    try {
      let response;
      setIsLoading(true);
      if (isPersonalView) {
        response = await profileApis.profile.getOne();
      } else {
        response = await profileApis.profile.getOne(profileId);
        setIsFollowing(response?.isFollowing);
      }
      setProfile(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [isPersonalView, profileId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const toggleFollowUnfollow = async (profileId: string) => {
    try {
      const response = await profileApis.followUnfollow.updateOne(profileId, {
        isFollowing: !isFollowing,
      });

      // Update `isFollowing` and the number of followers in the `profile` state
      setProfile((prevProfile) =>
        prevProfile
          ? {
              ...prevProfile,
              isFollowing: response?.isFollowing,
              followers:
                prevProfile.followers + (response?.isFollowing ? 1 : -1),
            }
          : null
      );

      setIsFollowing(response?.isFollowing);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    profile,
    fetchProfile,
    toggleFollowUnfollow,
    isFollowing,
    isLoading,
  };
};
