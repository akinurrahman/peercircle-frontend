import { LucideLoader } from "lucide-react";

interface ButtonLoaderProps {
  size?: number;
  color?: string;
  loadingText?: string;
}
export const ButtonLoader = ({
  size = 20,
  color = "text-white",
  loadingText,
}: ButtonLoaderProps) => {
  return (
    <div className="flex items-center space-x-2">
      <LucideLoader className={`animate-spin ${color}`} size={size} />
      {loadingText && <span>{loadingText}</span>}
    </div>
  );
};
