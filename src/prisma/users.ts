import { prisma } from "@/lib/prisma/prismaSingleton";
import { User as PrismaUser } from "@prisma/client";
import { Specification } from "../lib/prisma/specification";
import ID from "@/types/id";
import User from "@/types/user";

export async function createUser(user: User): Promise<User> {
  const createdUser = await prisma.user.create({
    data: user as PrismaUser,
  });
  return createdUser as User;
}

export async function getUsers(
  specification?: Specification<User>
): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: specification?.where,
    orderBy: specification?.orderBy ?? { createdAt: "desc" },
    include: specification?.includeRelations
      ? {
          tasks: true,
          userStories: true,
        }
      : undefined,
  });
  return users as User[];
}

export async function getUser(id: ID): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user as User;
}

export async function updateUser(id: ID, data: Partial<User>): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser as User;
}

export async function deleteUser(id: ID): Promise<void> {
  await prisma.user.delete({
    where: { id },
  });
}
