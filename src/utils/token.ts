import Cookies from "js-cookie";

// Function to set the token
export const setToken = (name: string, token: string): void => {
  Cookies.set(name, token);
};

// Function to check if a token is expired
export const isTokenExpired = (token: string | undefined | null): boolean => {
  if (!token) return true; // No token means expired
  const payload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
  return payload.exp * 1000 < Date.now(); // Check expiration
};

// Function to remove the token
export const removeToken = (name: string): void => {
  Cookies.remove(name);
};
