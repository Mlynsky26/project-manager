import { NextResponse } from "next/server";
import { getUserStories, createUserStory } from "@/prisma/userStories";
import { searchParamsToSpecification } from "@/lib/prisma/specification";
import UserStory from "@/types/userStory";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specification = searchParamsToSpecification(searchParams);

    const userStories = await getUserStories(specification);
    return NextResponse.json(userStories);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch user stories: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const now = new Date();
    const userStoryData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as UserStory;
    const userStory = await createUserStory(userStoryData);
    return NextResponse.json(userStory);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create user story: ${error}` },
      { status: 400 }
    );
  }
}
