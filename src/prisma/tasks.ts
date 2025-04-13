import { prisma } from "@/lib/prisma/prismaSingleton";
import { Task as PrismaTask } from "@prisma/client";
import { Specification } from "../lib/prisma/specification";
import ID from "@/types/id";
import Task from "@/types/task";

export async function createTask(task: Task): Promise<Task> {
  const createdTask = await prisma.task.create({
    data: task as PrismaTask,
  });
  return createdTask as Task;
}

export async function getTasks(
  specification?: Specification<Task>
): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    where: specification?.where,
    orderBy: specification?.orderBy ?? { createdAt: "desc" },
    include: specification?.includeRelations
      ? {
          assignedUser: true,
          userStory: true,
        }
      : undefined,
  });
  return tasks as Task[];
}

export async function getTask(id: ID): Promise<Task> {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  return task as Task;
}

export async function updateTask(id: ID, data: Partial<Task>): Promise<Task> {
  const updatedTask = await prisma.task.update({
    where: { id },
    data,
  });
  return updatedTask as Task;
}

export async function deleteTask(id: ID): Promise<void> {
  await prisma.task.delete({
    where: { id },
  });
}
