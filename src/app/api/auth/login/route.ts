import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { User } from "@/context/UserContext";
import { users } from "@/app/api/data/users";


export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ error: "Invalid login or password" }, { status: 401 });
  }

  const token = generateToken(user);
  const response = NextResponse.json({ token });

  // Ustawienie tokena w ciasteczkach
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  return response;
}
