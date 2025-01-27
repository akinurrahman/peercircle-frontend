import { NextRequest, NextResponse } from "next/server";
import {
  authenticationRoutes,
  defaultAuthenticationPath,
  defaultProtectedRoute,
  generateMatchers,
  protectedRoutes,
} from "./constants/config.constant";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthenticated = req.cookies.has("refreshToken");

  // 1. If user is authenticated (has a token) and tries to access an authentication route
  if (isAuthenticated && authenticationRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(defaultProtectedRoute, req.url));
  }

  // 2. Redirect unauthenticated users accessing protected routes to the default authentication route
  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(defaultAuthenticationPath, req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: generateMatchers(),
};
