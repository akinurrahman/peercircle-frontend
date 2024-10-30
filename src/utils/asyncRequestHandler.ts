import axios, { AxiosResponse, AxiosError } from "axios";

// Define more specific types
type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  status: number;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  status: number;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
type RequestFunction<T> = () => Promise<
  AxiosResponse<T & { success?: boolean; message?: string }>
>;

export const asyncRequestHandler = async <T>(
  requestFn: RequestFunction<T>
): Promise<ApiResponse<T>> => {
  try {
    const response = await requestFn();

    // Check if the response indicates an error
    if (response.data.success === false) {
      return {
        success: false,
        message: response.data.message || "An error occurred",
        status: response.status,
      };
    }

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error occurred:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (!axiosError.response) {
        return {
          success: false,
          message: "Network error: Please check your internet connection.",
          status: 0,
        };
      }
      return {
        success: false,
        message:
          axiosError.response.data?.message || "An unexpected error occurred.",
        status: axiosError.response.status || 500,
      };
    } else {
      return {
        success: false,
        message: (error as Error).message || "An unexpected error occurred.",
        status: 500,
      };
    }
  }
};
