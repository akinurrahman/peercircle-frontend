import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "../common/FormInput";

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
  mediaUrls: z.array(z.string()).optional(),
});

export const SellProductModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
        <div className="flex gap-5">
          <FormInput
            name="category"
            label="Category"
            fieldType="select"
            options={[
              { label: "Electronics", value: "electronics" },
              { label: "Clothing", value: "clothing" },
              { label: "Home", value: "home" },
              { label: "Toys", value: "toys" },
            ]}
          />
          <FormInput
            fieldType="select"
            name="condition"
            label="Condition"
            options={[
              { label: "New", value: "new" },
              { label: "Used", value: "used" },
            ]}
          />
          <FormInput fieldType="input" name="price" label="Price" />
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
