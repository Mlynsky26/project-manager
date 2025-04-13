import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/prisma/projects";
import { searchParamsToSpecification } from "@/lib/prisma/specification";
import Project from "@/types/project";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specification = searchParamsToSpecification(searchParams);

    const projects = await getProjects(specification);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch projects: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const now = new Date();
    const projectData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    } as Project;
    const project = await createProject(projectData);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create project: ${error}` },
      { status: 400 }
    );
  }
}
