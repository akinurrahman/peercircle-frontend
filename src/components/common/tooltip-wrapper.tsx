import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface TooltipWrapperProps {
  content: string | React.ReactNode; // content can be a string or a React node (HTML tags)
  children: React.ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  content,
  children,
}) => {
  // Check if content is a string or a React node and render accordingly
  const renderContent = () => {
    if (typeof content === "string") {
      return <p>{content}</p>;
    }
    return content; // If it's a React node, directly return it
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{renderContent()}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
