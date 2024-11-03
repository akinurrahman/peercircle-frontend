import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

/**
 * Utility function to get a user-friendly error message from an Axios error.
 *
 * @param error - The Axios error object.
 * @returns A string containing the error message.
 */
export const getErrorMessage = (error: AxiosError): string => {
  // Check if the error has a response from the server
  if (error.response) {
    const data = error.response.data as ErrorResponse;
    const message = data.message || "An error occurred. Please try again.";

    return message; // Return the message from the server or a default message
  }

  // Handle cases where there was no response
  if (error.request) {
    return "Network error: Please check your connection."; // Network error
  }

  // Handle other errors (e.g., setup issues)
  return `${error.message}`;
};
