"use client";

import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../common/FormInput";
import { uploadToCloud } from "@/services/apis/file-upload/file.api";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { profileApis } from "@/services/apis/profile/profile.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { closeModal } from "@/store/slices/modal.slice";

const CreatePostSchema = z.object({
  caption: z.string().optional(),
  mediaUrls: z
    .array(z.instanceof(File))
    .nonempty("At least one media file is required"),
});

type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;

export const CreatePostModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      caption: "",
      mediaUrls: [],
    },
  });

  const onSubmit = async (data: CreatePostSchemaType) => {
    try {
      const uploadedUrls = await uploadToCloud(data.mediaUrls);
      await profileApis.post.create({
        caption: data.caption,
        mediaUrls: uploadedUrls,
      });
      dispatch(closeModal());
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormInput fieldType="input" name="caption" label="Caption" />
        <FormInput
          fieldType="file"
          name="mediaUrls"
          label="Upload Media"
          multiple
          accept="image/*,video/*"
        />
        <Button
          type="submit"
          className="float-right"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Posting..." : "Post"}
        </Button>
      </form>
    </Form>
  );
};
