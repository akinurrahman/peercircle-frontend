import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  authenticationRoute,
  protectedRoutes,
  defaultAuthenticationPath,
  defaultProtectedRoute,
  generateMatchers,
} from "@/constants/config.constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get the authentication token from cookies
  const token = req.cookies.get("auth-token")?.value;

  // 1. If user is authenticated (has a token) and tries to access an authentication route
  if (token && authenticationRoute.includes(pathname)) {
    return NextResponse.redirect(new URL(defaultProtectedRoute, req.url));
  }

  // 2. Redirect unauthenticated users accessing protected routes to the default authentication route
  const userRoutes = protectedRoutes.user;
  if (!token && userRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(defaultAuthenticationPath, req.url));
  }

  // 3. Allow the request to proceed for other routes
  return NextResponse.next();
}

export const config = {
  matcher: generateMatchers(),
};
