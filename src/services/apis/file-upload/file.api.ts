import http from "@/services/http";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "sonner";


export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await http.post("/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  } catch (error) {
    console.error("File upload failed:", error);
    toast.error(getErrorMessage(error))
  }
};
