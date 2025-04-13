import { useMapEnumToSelect } from "@/lib/utils/enums";
import { UserStoryPriority, UserStoryStatus } from "@prisma/client";
import { KanbanBase } from "./kanbanBase";
import ID from "./id";

export const useUsersStoretorySelectPriorities = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(UserStoryPriority, "userStory.properties.priority");

export const useUsersStoretorySelectStatuses = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(UserStoryStatus, "userStory.properties.status");

export default interface UserStory extends KanbanBase {
  priority: UserStoryPriority;
  status: UserStoryStatus;
  projectId: ID;
  ownerId: ID;
}
