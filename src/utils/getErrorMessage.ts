import axios, { AxiosError } from "axios";

// Define a custom error type that includes AxiosError
type CustomError = AxiosError | Error | unknown;

export const getErrorMessage = (error: CustomError): string => {
  // Check if error is an instance of AxiosError
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const statusCode = error.response.status;
      const serverMessage =
        error.response.data.message || "An unexpected error occurred.";

      // Customize messages based on the status code
      switch (statusCode) {
        case 400:
          return serverMessage || "Bad Request. Please check your input.";
        case 401:
          return serverMessage || "Unauthorized. Please log in again.";
        case 403:
          return (
            serverMessage ||
            "Forbidden. You do not have permission to access this resource."
          );
        case 404:
          return serverMessage || "Resource not found.";
        case 500:
          return (
            serverMessage || "Internal Server Error. Please try again later."
          );
        default:
          return serverMessage; // Fallback to the server's message
      }
    } else if (error.request) {
      return "Network error. Please check your internet connection and try again.";
    } else {
      return "Error in request setup: " + error.message;
    }
  } else {
    // Handle non-Axios errors
    return "An unexpected error occurred: " + String(error);
  }
};
