import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UpdateUserStoryForm from "./forms/updateUserStoryForm";
import UserStory from "@/types/userStory";
import { toast } from "sonner";
import { useUsersStore } from "@/providers/usersProvider";
import { routes } from "@/lib/routes/routes";
import BaseCard from "../../shared/base/baseCard";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuClipboardList } from "react-icons/lu";

export default function UserStoryCard(userStory: UserStory) {
  const deleteUserStory = useUsersStoretoriesStore(
    (state) => state.deleteUserStory
  );
  const owner = useUsersStore((state) => state.getUserById(userStory.ownerId));

  const handleDelete = () => {
    try {
      deleteUserStory(userStory.id);
      toast.success("Pomyślnie usunięto historyjkę");
    } catch {
      toast.error("Nie udało się usunąć historyjki");
    }
  };

  const additionalActions = (
    <ActionButton
      variant="default"
      href={routes.userStories.tasks.index(userStory.id)}
      tooltip="Zadania"
    >
      <LuClipboardList />
    </ActionButton>
  );

  const additionalProperties = (
    <>
      <p>
        <strong>Priorytet:</strong>{" "}{userStory.priority}
      </p>
      <p>
        <strong>Właścicel:</strong>{" "}
        {owner ? owner.displayName || owner.email : "N/A"}
      </p>
    </>
  );

  return (
    <BaseCard<UserStory>
      item={userStory}
      onDelete={handleDelete}
      additionalActions={additionalActions}
      additionalProperties={additionalProperties}
      UpdateFormComponent={UpdateUserStoryForm}
    />
  );
}
