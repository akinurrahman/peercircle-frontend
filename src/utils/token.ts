import Cookies from "js-cookie";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "token";

// Function to set the token
export const setToken = (token: string): void => {
  Cookies.set(TOKEN_NAME, token);
};

// Function to get the token
export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

// Function to remove the token
export const removeToken = (): void => {
  Cookies.remove("token");
};
