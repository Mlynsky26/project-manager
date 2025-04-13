import { NextResponse } from "next/server";
import { getUsers, createUser } from "@/prisma/users";
import { searchParamsToSpecification } from "@/lib/prisma/specification";
import User from "@/types/user";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specification = searchParamsToSpecification(searchParams);

    const users = await getUsers(specification);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch users: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const now = new Date();
    const userData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as User;
    const user = await createUser(userData);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create user: ${error}` },
      { status: 400 }
    );
  }
}
