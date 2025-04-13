"use client";

import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { UserStoryPriority, UserStoryStatus } from "@prisma/client";
import ID from "@/types/id";
import { toast } from "sonner";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuNotebookPen } from "react-icons/lu";

interface CreateUserStoryFormProps {
  ownerId: ID;
  projectId: ID;
}

export default function CreateUserStoryForm({
  ownerId,
  projectId,
}: CreateUserStoryFormProps) {
  const addUserStory = useUsersStoretoriesStore((state) => state.addUserStory);

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
      await addUserStory({
        name: values.name,
        description: values.description,
        priority: values.priority,
        status: values.status,
        projectId,
        ownerId,
      });
      toast.success("Pomyślnie utworzono historyjkę");
    } catch {
      toast.error("Nie udało się utworzyć historyjki");
    }
  };

  return (
    <UserStoryForm
      initialValues={{
        name: "",
        description: "",
        priority: UserStoryPriority.LOW,
        status: UserStoryStatus.PENDING,
      }}
      onSubmit={handleCreate}
      trigger={
        <ActionButton tooltip="Utwórz" size="icon">
          <LuNotebookPen />
        </ActionButton>
      }
      title="Utwórz historyjkę"
    />
  );
}
