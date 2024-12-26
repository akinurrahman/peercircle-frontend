import { ERROR_MESSAGE } from "@/constants/common.constant";
import { ApiError } from "@/constants/interface.constant";

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.response?.data?.message || ERROR_MESSAGE;
  }
  return ERROR_MESSAGE; // Default error message if the error is not structured as expected
};

// Type guard to check if error is ApiError
function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "response" in error;
}
