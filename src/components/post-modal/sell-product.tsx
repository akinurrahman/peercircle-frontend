import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "../common/FormInput";
import { useCategory } from "@/services/apis/common.api";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { uploadToCloud } from "@/services/apis/file-upload/file.api";
import { profileApis } from "@/services/apis/profile/profile.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { closeModal } from "@/store/slices/modal.slice";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  condition: z.string({
    required_error: "Please select a condition.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  mediaUrls: z
    .array(z.instanceof(File))
    .nonempty("At least one media file is required"),
});

type SellProductSchemaType = z.infer<typeof formSchema>;

export const SellProductModal = () => {
  const { categories } = useCategory();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<SellProductSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      condition: "",
      price: "",
      mediaUrls: [],
    },
  });

  const onSubmit: SubmitHandler<SellProductSchemaType> = async (data) => {
    try {
      const mediaUrls = await uploadToCloud(data.mediaUrls);
      await profileApis.product.create({
        name: data.name,
        description: data.description,
        category: data.category,
        condition: data.condition,
        price: data.price,
        mediaUrls,
      });
      toast.success("Product created successfully");
      dispatch(closeModal());
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormInput fieldType="input" name="name" label="Item Name" />
        <FormInput
          fieldType="textarea"
          name="description"
          label="Description"
        />
        <div className="grid grid-cols-3 gap-3">
          <FormInput
            name="category"
            fieldType="select"
            placeholder="Category"
            options={categories.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
          />
          <FormInput
            fieldType="select"
            name="condition"
            placeholder="Condition"
            options={[
              { label: "New", value: "new" },
              { label: "Used", value: "used" },
              { label: "Refurbished", value: "refurbished" },
            ]}
          />
          <FormInput fieldType="input" name="price" placeholder="Price" />
        </div>
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
          {form.formState.isSubmitting ? "Listing..." : "List Item"}
        </Button>
      </form>
    </Form>
  );
};
