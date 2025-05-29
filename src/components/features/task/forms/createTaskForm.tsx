"use client";

import { useTasksStore } from "@/providers/tasksProvider";
import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { TaskPriority, TaskStatus } from "@prisma/client";
import ID from "@/types/id";
import { toast } from "sonner";
import { useSession } from "@/lib/auth/authClient";

interface CreateTaskFormProps {
  userStoryId: ID;
  trigger: React.ReactElement;
}

export default function CreateTaskForm({
  userStoryId,
  trigger,
}: CreateTaskFormProps) {
  const addTask = useTasksStore((state) => state.addTask);
  const session = useSession();

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
      await addTask({
        name: values.name,
        description: values.description,
        priority: values.priority,
        status: TaskStatus.PENDING,
        estimatedTime: values.estimatedTime,
        userStoryId,
      });
      toast.success("Zadanie zostało utworzone");
    } catch {
      toast.error("Nie udało się utworzyć zadania");
    }
  };

  if (session?.data?.user?.role === "GUEST") {
    return <></>
  }

  return (
    <TaskForm
      initialValues={{
        name: "",
        description: "",
        priority: TaskPriority.LOW,
        estimatedTime: 0,
      }}
      onSubmit={handleCreate}
      trigger={trigger}
      title="Utwórz zadanie"
    />
  );
}
