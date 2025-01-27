export const authenticationRoutes = [
  "/login",
  "/signup",
  "/otp-verification",
  "/reset-password",
  "/forgot-password",
];

// Protected routes for different roles
export const protectedRoutes = ["/profile", "/settings"];

// Default redirect paths
export const defaultProtectedRoute = "/profile";
export const defaultAuthenticationPath = "/login";
export const defaultFeedPath = "/feed";

// Function to generate matcher array
export const generateMatchers = () => {
  const allRoutes = Object.values(protectedRoutes).flat(); // Combine all routes
  const uniqueRoutes = [...new Set(allRoutes)]; // Remove duplicates
  return uniqueRoutes.map((route) => `${route}/:path*`);
};

export const accessTokenCookie = "accessToken";
export const refreshTokenCookie = "refreshToken";
