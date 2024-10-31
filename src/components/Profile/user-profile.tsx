"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Mail, Edit } from "lucide-react";
import ProfileHeader from "./profile-header";
import AboutSection from "./about-section";
import PostsSection from "./posts-section";
import ItemsForSaleSection from "./items-for-sale-section";
import AchievementPopup from "./achivement-popup";
import StatsSection from "./stats-section";

export default function UserProfile({
  isPersonalView = false,
}: {
  isPersonalView?: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);

  const userInfo = {
    name: "Sarah Johnson",
    username: "sarahcodes",
    avatar: "/placeholder.svg?height=128&width=128",
    university: "University of Technology",
    degree: "Computer Science",
    year: "3rd Year",
    bio: "Passionate about technology and its potential to change the world. Always learning, always coding!",
    reviews: 15,
    itemsSold: 20,
    followers: 1200,
    rating: 4.8,
    achievements: ["Top Seller", "Quick Responder", "Verified Student"],
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-gray-50">
      <ProfileHeader
        userInfo={userInfo}
        isFollowing={isFollowing}
        toggleFollow={toggleFollow}
        isPersonalView={isPersonalView}
      />

      <div className="p-4 sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="space-y-6 lg:w-1/3">
            <AboutSection userInfo={userInfo} />
            <StatsSection userInfo={userInfo} />
          </div>

          <div className="lg:w-2/3">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-2 rounded-full bg-white p-1 shadow-md">
                <TabsTrigger value="posts" className="rounded-full text-lg">
                  Posts
                </TabsTrigger>
                <TabsTrigger value="items" className="rounded-full text-lg">
                  Items for Sale
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <PostsSection />
              </TabsContent>
              <TabsContent value="items">
                <ItemsForSaleSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <AchievementPopup show={showAchievement} />

      {isPersonalView && (
        <Button
          variant="default"
          size="lg"
          className="fixed bottom-4 right-4 rounded-full shadow-lg"
          onClick={() => console.log("Edit profile")}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      )}
    </div>
  );
}
