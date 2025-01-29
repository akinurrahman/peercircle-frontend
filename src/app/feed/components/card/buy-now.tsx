import { Button } from "@/components/ui/button";
import { messageApis } from "@/services/apis/message/message.api";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const BuyNow = ({ profileId }: { profileId: string }) => {
  const router = useRouter();
  const redirectToMessage = async () => {
    try {
      const response = await messageApis.conversation.create({
        receiverId: profileId,
      });

      router.push(`/messages/${response?.conversationId}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return <Button onClick={redirectToMessage}>Buy Now</Button>;
};

export default BuyNow;
