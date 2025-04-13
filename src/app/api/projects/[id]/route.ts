import { NextResponse } from "next/server";
import { getProject, updateProject, deleteProject } from "@/prisma/projects";
import ID from "@/types/id";

export async function GET(req: Request, { params }: { params: { id: ID } }) {
  try {
    const { id } = await params;
    const project = await getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch project: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: ID } }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };
    const project = await updateProject(id, updateData);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update project: ${error}` },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: ID } }) {
  try {
    const { id } = await params;
    await deleteProject(id);
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete project: ${error}` },
      { status: 400 }
    );
  }
}
