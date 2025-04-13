"use client";

import { z } from "zod";
import { formSchema, TaskForm } from "./taskForm";
import { useTasksStore } from "@/providers/tasksProvider";
import Task from "@/types/task";
import { toast } from "sonner";
import UpdateFormProps from "@/types/props/updateFormProps";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuPencil } from "react-icons/lu";

type UpdateTaskFormProps = UpdateFormProps<Task>;

export default function UpdateTaskForm({ item: task }: UpdateTaskFormProps) {
  const updateTask = useTasksStore((state) => state.updateTask);

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateTask({
        ...task,
        name: values.name,
        description: values.description,
        priority: values.priority,
        estimatedTime: values.estimatedTime,
      });
      toast.success("Pomyślnie zaktualizowano zadanie");
    } catch {
      toast.error("Nie udało się zaktualizować zadania");
    }
  };

  return (
    <TaskForm
      initialValues={task}
      onSubmit={handleUpdate}
      trigger={
        <ActionButton
          variant="secondary"
          size="icon"
          tooltip="Edytuj zadanie"
        >
          <LuPencil />
        </ActionButton>
      }
      title= "Edytuj zadanie"
    />
  );
}
