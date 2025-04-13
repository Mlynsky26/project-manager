import { UserStory as PrismaUserStory } from "@prisma/client";
import { Specification } from "../lib/prisma/specification";
import ID from "@/types/id";
import UserStory from "@/types/userStory";
import { prisma } from "@/lib/prisma/prismaSingleton";

export async function createUserStory(
  userStory: UserStory
): Promise<UserStory> {
  const createdUserStory = await prisma.userStory.create({
    data: userStory as PrismaUserStory,
  });
  return createdUserStory as UserStory;
}

export async function getUserStories(
  specification?: Specification<UserStory>
): Promise<UserStory[]> {
  const userStories = await prisma.userStory.findMany({
    where: specification?.where,
    orderBy: specification?.orderBy ?? { createdAt: "desc" },
    include: specification?.includeRelations
      ? {
          project: true,
          owner: true,
          tasks: true,
        }
      : undefined,
  });
  return userStories as UserStory[];
}

export async function getUserStory(id: ID): Promise<UserStory> {
  const userStory = await prisma.userStory.findUnique({
    where: { id },
  });
  return userStory as UserStory;
}

export async function updateUserStory(
  id: ID,
  data: Partial<UserStory>
): Promise<UserStory> {
  const updatedUserStory = await prisma.userStory.update({
    where: { id },
    data,
  });
  return updatedUserStory as UserStory;
}

export async function deleteUserStory(id: ID): Promise<void> {
  await prisma.userStory.delete({
    where: { id },
  });
}
