"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/FormInput";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  files: z.array(z.string()).optional(),
});

function ExampleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      files: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "up");
  }

  return (
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
          fieldType="file"
          name="files"
          label="Upload Files"
          description="Upload one or more files"
          accept="image/*"
          multiple
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ExampleForm;
