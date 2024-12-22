"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { profileSchema } from "@/validations/profile.schema";
import { debounce } from "lodash";
import { profileApis } from "@/services/apis/profile/profile.api";
import { uploadFile } from "@/services/apis/file-upload/file.api";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Profile } from "../hooks/useFetchProfile";
import { FormInput } from "@/components/common/FormInput";

interface EditProfileModalProps {
  profile: Profile;
  fetchProfile: () => void;
}

export function EditProfileModal({
  profile,
  fetchProfile,
}: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(
    profile.profilePicture ?? null
  );

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  const checkUsernameAvailability = debounce(async (username: string) => {
    if (!username) return;
    try {
      const response =
        await profileApis.checkUsernameAvailability.getOne(username);
      setIsUsernameAvailable(response?.available);
    } catch (error) {
      console.error("Error checking username availability:", error);
      setIsUsernameAvailable(false);
    }
  }, 500);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const response = await uploadFile(file);
      setProfilePicture(response);
    }
  };


  const onSubmit = async (data: Profile) => {
    console.log("Submitted Data:", data);
    try {
      await profileApis.profile.updateOne("", {
        ...data,
        profilePicture,
      });
      fetchProfile();
      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative flex justify-center gap-4">
              <Avatar className="size-24">
                <AvatarImage
                  src={profilePicture || ""}
                  alt={profile.fullName}
                  className="object-cover"
                />
                <AvatarFallback>
                  {profile.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0"
                  onChange={(e) => handleFileChange(e)}
                />
              </Avatar>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName">Name</Label>
              <div className="col-span-3">
                <FormInput fieldType="input" name="fullName" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="mb-1.5">
                Username
              </Label>
              <div className="col-span-3">
                <FormInput
                  fieldType="input"
                  name="username"
                  onChange={checkUsernameAvailability}
                />
                <div className="mt-1.5">
                  {isUsernameAvailable === true && (
                    <p className="text-xs text-green-500">
                      Username is available!
                    </p>
                  )}
                  {isUsernameAvailable === false && (
                    <p className="text-xs text-red-500">
                      Username is taken. Try another.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio">Bio</Label>
              <div className="col-span-3">
                <FormInput fieldType="textarea" name="bio" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Gender</Label>
              <FormInput
                name="gender"
                fieldType="radio"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
                radioLayout="row"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location">Location</Label>
              <div className="col-span-3">
                <FormInput fieldType="input" name="location" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website_url">Website</Label>
              <div className="col-span-3">
                <FormInput fieldType="input" name="website_url" />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!isUsernameAvailable || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
