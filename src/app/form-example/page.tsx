"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/FormInput";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  newsletter: z.boolean().default(false),
  notificationPreference: z.enum(["email", "sms", "push"], {
    required_error: "Please select a notification preference.",
  }),
  avatar: z.array(z.instanceof(File)).optional(),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      role: "",
      newsletter: false,
      notificationPreference: "email",
      avatar: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    // <FormProvider {...form}>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput
          fieldType="input"
          name="username"
          label="Username"
          placeholder="johndoe"
          description="This is your public display name."
        />
        <FormInput
          fieldType="input"
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          description="Your email address."
        />
        <FormInput
          fieldType="textarea"
          name="bio"
          label="Bio"
          placeholder="Tell us a little bit about yourself"
          description="Your bio will be displayed on your profile."
        />
        <FormInput
          fieldType="select"
          name="role"
          label="Role"
          placeholder="Select a role"
          description="Select your role in the organization."
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
            { value: "guest", label: "Guest" },
          ]}
        />
        <FormInput
          fieldType="checkbox"
          name="newsletter"
          label="Subscribe to newsletter"
          description="Receive updates about our products and services."
        />
        <FormInput
          fieldType="radio"
          name="notificationPreference"
          label="Notification Preference"
          description="Choose how you'd like to receive notifications."
          options={[
            { value: "email", label: "Email" },
            { value: "sms", label: "SMS" },
            { value: "push", label: "Push Notification" },
          ]}
        />
        <FormInput
          fieldType="file"
          name="avatar"
          label="Avatar"
          description="Upload your profile picture."
          accept="image/*"
          multiple
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    // {/* </FormProvider> */}
  );
}
