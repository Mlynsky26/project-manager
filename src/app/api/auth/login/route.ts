import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateTokens } from "@/lib/auth";
import { User } from "@/context/UserContext";
import { users } from "@/app/api/data/users";
import { access } from "fs";


export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ error: "Invalid login or password" }, { status: 401 });
  }

  const tokens = await generateTokens(user);
  const response = NextResponse.json(tokens);

  response.cookies.set("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  response.cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7200,
    path: "/",
  });

  return response;
}
