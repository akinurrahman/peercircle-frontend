import http from "@/services/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "sonner";

export const uploadToCloud = async (files: File | File[]) => {
  try {
    const formData = new FormData();

    if (Array.isArray(files)) {
      // Handle multiple files
      files.forEach((file) => formData.append("files", file));
      const response = await http.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.urls; // Array of file URLs
    } else {
      // Handle a single file
      formData.append("file", files);
      const response = await http.post("/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.url; // Single file URL
    }
  } catch (error) {
    console.error("File upload failed:", error);
    toast.error(getErrorMessage(error));
    return null;
  }
};
