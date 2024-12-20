import generateApis from "@/services/generate.api";

export const authApis = {
  register: generateApis("/register"),
  verifyOtp: generateApis("/verify-email"),
  login: generateApis("/login"),
};
