import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  authenticationRoute,
  protectedRoutes,
  defaultAuthenticationPath,
  defaultProtectedRoute,
  generateMatchers,
  accessTokenCookie,
} from "@/constants/config.constant";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(accessTokenCookie)?.value;
  const isAuthenticated = token !== undefined && token !== null && token !== "";

  // 1. If user is authenticated (has a token) and tries to access an authentication route
  if (isAuthenticated && authenticationRoute.includes(pathname)) {
    return NextResponse.redirect(new URL(defaultProtectedRoute, req.url));
  }

  // 2. Redirect unauthenticated users accessing protected routes to the default authentication route
  if (!isAuthenticated && protectedRoutes.user.includes(pathname)) {
    return NextResponse.redirect(new URL(defaultAuthenticationPath, req.url));
  }

  // 3. Allow the request to proceed for other routes
  return NextResponse.next();
}

export const config = {
  matcher: generateMatchers(),
};
