import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";


export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("///////////////////////////////////////");
  console.log("path", req.nextUrl.pathname);


  if (!token) {
    if (req.nextUrl.pathname !== "/login") {
      console.log("no token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      console.log("no token but on login page");
      return NextResponse.next();
    }
  }

  console.log("verifying token");
  // const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
  // const decoded =  jwt.verify(token, SECRET_KEY);
  // console.log(decoded)
  // if(!decoded) {
  //   console.log("no decoded, redirecting to login");
  // }
  // Verify token and handle expiration

  const response = await fetch('http://localhost:3000/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("response not ok");
    if (req.nextUrl.pathname !== "/login") {
      console.log("no decoded, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      console.log("no decoded but on login page");
      return NextResponse.next();
    }
  }

  console.log('end')
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
