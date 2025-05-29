import { NextRequest, NextResponse, URLPattern } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "better-auth";
import { routes } from "./lib/routes/routes";
import PROTECTED_ROUTES from "./lib/routes/protectedRoutes";
import GUEST_ROUTES from "./lib/routes/guestRoutes";
import { PathEntry } from "./lib/routes/PathEntry";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = checkPaths(PROTECTED_ROUTES, pathname);
  const isGuest = checkPaths(GUEST_ROUTES, pathname);

  if (!isProtected && !isGuest) {
    return NextResponse.next();
  }

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );
  //case: PROTECTED
  if (isProtected) {
    return handleProtected(request, session);
  }

  // //case: GUEST
  if (isGuest) {
    return handleGuest(request, session);
  }

  //case: PUBLIC
  return NextResponse.next();
}

function checkPaths(paths:PathEntry[], pathname: string): boolean {
  return paths.some((path) => {
    if (typeof path === "string") {
      return pathname === path;
    } else if (typeof path === "function") {
      const pattern = new URLPattern({ pathname: path(":param1", ":param2", ":param3", ":param4") });
      return pattern.test({ pathname });
    }
    return false;
  });
}

function handleProtected(request: NextRequest, session: Session | null) {
  return !session
    ? handleAuthenticationRedirect(request, routes.auth.signIn)
    : NextResponse.next();
}

function handleGuest(request: NextRequest, session: Session | null) {

  return session
    ? handleAuthenticationRedirect(request, routes.home)
    : NextResponse.next();
}

function handleAuthenticationRedirect(
  request: NextRequest,
  redirectUrl: string
) {
  return request.nextUrl.pathname.startsWith("/api")
    ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    : NextResponse.redirect(new URL(redirectUrl, request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.webmanifest).*)",
  ],
};
