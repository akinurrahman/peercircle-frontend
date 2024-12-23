import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const CreatePostModal = () => {
  return (
    <div className="space-y-4">
      <Input placeholder="Title" />
      <Textarea placeholder="Write your post content here..." />
      <Button className="w-full">Create Post</Button>
    </div>
  );
};
