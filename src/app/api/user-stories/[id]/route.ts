import { NextResponse } from "next/server";
import {
  getUserStory,
  updateUserStory,
  deleteUserStory,
} from "@/prisma/userStories";
import ID from "@/types/id";

export async function GET({ params }: { params: { id: ID } }) {
  try {
    const { id } = await params;
    const userStory = await getUserStory(id);
    if (!userStory) {
      return NextResponse.json(
        { error: "User story not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(userStory);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch user story: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: ID } }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };
    const userStory = await updateUserStory(id, updateData);
    return NextResponse.json(userStory);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update user story: ${error}` },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: ID } }
) {
  try {
    const { id } = await params;
    await deleteUserStory(id);
    return NextResponse.json({ message: "User story deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete user story: ${error}` },
      { status: 400 }
    );
  }
}
