import { NextResponse } from "next/server";
import { getTask, updateTask, deleteTask } from "@/prisma/tasks";
import ID from "@/types/id";

export async function GET({ params }: { params: { id: ID } }) {
  try {
    const { id } = await params;
    const task = await getTask(id);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch task: ${error}` },
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
    const task = await updateTask(id, updateData);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update task: ${error}` },
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
    await deleteTask(id);
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete task: ${error}` },
      { status: 400 }
    );
  }
}
