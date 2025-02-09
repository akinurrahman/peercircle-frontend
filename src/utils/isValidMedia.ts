import { ALLOWED_DOMAINS } from "@/constants/common.constant";

export const isValidMediaUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === "https:" &&
      ALLOWED_DOMAINS.includes(parsedUrl.hostname)
    );
  } catch (error) {
    console.error("Invalid URL:", url, error);
    return false;
  }
};
