"use client";

import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UserStory from "@/types/userStory";
import { toast } from "sonner";
import UpdateFormProps from "@/types/props/updateFormProps";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuPencil } from "react-icons/lu";

type UpdateUserStoryFormProps = UpdateFormProps<UserStory>;

export default function UpdateUserStoryForm({
  item: userStory,
}: UpdateUserStoryFormProps) {
  const updateUserStory = useUsersStoretoriesStore(
    (state) => state.updateUserStory
  );

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateUserStory({
        ...userStory,
        name: values.name,
        description: values.description,
        priority: values.priority,
        status: values.status,
      });
      toast.success("Pomyślnie zaktualizowano historyjkę");
    } catch {
      toast.error("Nie udało się zaktualizować historyjki");
    }
  };

  return (
    <>
      <UserStoryForm
        initialValues={userStory}
        onSubmit={handleUpdate}
        trigger={
          <ActionButton
            variant="secondary"
            size="icon"
            tooltip="Edytuj historyjkę"
          >
            <LuPencil />
          </ActionButton>
        }
        title="Edytuj historyjkę"
      />
    </>
  );
}
