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
  side?: "top" | "right" | "bottom" | "left"; // control the tooltip's position
  align?: "start" | "center" | "end"; // control the alignment of the tooltip
  offset?: number; // optional offset to control the distance from the trigger
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  content,
  children,
  side = "top",
  align = "center",
  offset = 5,
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
        <TooltipContent side={side} align={align} sideOffset={offset}>
          {renderContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
