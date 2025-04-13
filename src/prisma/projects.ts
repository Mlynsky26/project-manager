import { prisma } from "@/lib/prisma/prismaSingleton";
import { Specification } from "../lib/prisma/specification";
import ID from "@/types/id";
import Project from "@/types/project";
import { Project as PrismaProject } from "@prisma/client";

export async function createProject(project: Project): Promise<Project> {
  const createdProject = await prisma.project.create({
    data: project as PrismaProject,
  });
  return createdProject as Project;
}

export async function getProjects(
  specification?: Specification<Project>
): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: specification?.where,
    orderBy: specification?.orderBy ?? { createdAt: "desc" },
    include: specification?.includeRelations
      ? {
          userStories: true,
        }
      : undefined,
  });
  return projects as Project[];
}

export async function updateProject(
  id: ID,
  data: Partial<Project>
): Promise<Project> {
  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data,
  });
  return updatedProject as Project;
}

export async function deleteProject(id: ID): Promise<void> {
  await prisma.project.delete({
    where: {
      id,
    },
  });
}

export async function getProject(id: ID): Promise<Project> {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  return project as Project;
}
