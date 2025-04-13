"use client";

import { Specification } from "@/lib/prisma/specification";
import { TasksStoreProvider } from "@/providers/tasksProvider";
import ID from "@/types/id";
import Task from "@/types/task";
import { useParams } from "next/navigation";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();

  const specification: Specification<Task> = {
    where: {
      userStoryId: id as ID,
    },
  };
  return (
    <TasksStoreProvider specification={specification}>
      {children}
    </TasksStoreProvider>
  );
}
