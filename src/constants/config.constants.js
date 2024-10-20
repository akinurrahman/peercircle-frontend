export const authenticationRoute = ["/login", "/signup", "/otp-verification"];

// Protected routes for different roles
export const protectedRoutes = {
  admin: [],
  user: ["/profile", "/settings"],
};

// Default redirect paths
export const defaultProtectedRoute = "/profile";
export const defaultAuthenticationPath = "/login";

// Function to generate matcher array
export const generateMatchers = () => {
  const allRoutes = Object.values(protectedRoutes).flat(); // Combine all routes
  const uniqueRoutes = [...new Set(allRoutes)]; // Remove duplicates
  return uniqueRoutes.map((route) => `${route}/:path*`);
};
