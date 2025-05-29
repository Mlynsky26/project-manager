import { NextResponse } from "next/server";
import { getUsers } from "@/prisma/users";

export async function GET(request: Request) {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch users: ${error}` },
      { status: 500 }
    );
  }
}