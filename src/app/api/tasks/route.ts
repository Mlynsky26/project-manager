import { NextResponse } from "next/server";
import { getTasks, createTask } from "@/prisma/tasks";
import { searchParamsToSpecification } from "@/lib/prisma/specification";
import Task from "@/types/task";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specification = searchParamsToSpecification(searchParams);

    const tasks = await getTasks(specification);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch tasks: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const now = new Date();
    const taskData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as Task;
    const task = await createTask(taskData);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create task: ${error}` },
      { status: 400 }
    );
  }
}
