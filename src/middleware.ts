import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken} from "./lib/auth";


export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    if (req.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  }

  const verified = await verifyAccessToken(token);
  if (!verified && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login?refresh=1", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
