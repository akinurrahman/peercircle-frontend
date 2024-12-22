"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  bio: z.string().max(200, "Bio must not exceed 200 characters"),
  role: z.enum(["user", "admin", "moderator"]),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  notificationPreference: z.enum(["email", "sms", "push"]),
  theme: z.enum(["light", "dark", "system"]),
});

type FormValues = z.infer<typeof formSchema>;

const FormExample = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      role: "user",
      agreeTerms: false,
      notificationPreference: "email",
      theme: "system",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
  };

  return (
    // <FormProvider {...form}>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-8 p-6"
      >
        <h1 className="mb-6 text-2xl font-bold">Form Example</h1>

        <FormInput
          fieldType="input"
          name="username"
          label="Username"
          placeholder="Enter your username"
        />

        <FormInput
          fieldType="input"
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          onChange={(value) => console.log("Email changed:", value)}
        />

        <FormInput
          fieldType="input"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
        />

        <FormInput
          fieldType="textarea"
          name="bio"
          label="Bio"
          description="Tell us about yourself"
          placeholder="I am..."
          onChange={(value) => console.log("Bio updated:", value)}
        />

        <FormInput
          fieldType="select"
          name="role"
          label="Role"
          options={[
            { label: "User", value: "user" },
            { label: "Admin", value: "admin" },
            { label: "Moderator", value: "moderator" },
          ]}
        />

        <FormInput
          fieldType="checkbox"
          name="agreeTerms"
          label="I agree to the terms and conditions"
          onChange={(checked) => console.log("Terms agreed:", checked)}
        />

        <FormInput
          fieldType="radio"
          name="notificationPreference"
          label="Notification Preference"
          options={[
            { label: "Email", value: "email" },
            { label: "SMS", value: "sms" },
            { label: "Push Notification", value: "push" },
          ]}
          radioLayout="row"
        />

        <FormInput
          fieldType="switch"
          name="theme"
          label="Theme"
          onChange={(checked) => {
            console.log("Theme switched:", checked ? "dark" : "light");
          }}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    // </FormProvider>
  );
};

export default FormExample;
