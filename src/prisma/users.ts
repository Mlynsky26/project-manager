import { prisma } from "@/lib/prisma/prismaSingleton";
import User from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return users as User[];
}
