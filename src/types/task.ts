import { useMapEnumToSelect } from "@/lib/utils/enums";
import { TaskPriority, TaskStatus } from "@prisma/client";
import { KanbanBase } from "./kanbanBase";
import ID from "./id";

export const useTaskSelectPriorities = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(TaskPriority, "task.properties.priority");

export const useTaskSelectStatuses = (): ReturnType<
  typeof useMapEnumToSelect
> => useMapEnumToSelect(TaskStatus, "task.properties.status");

export default interface Task extends KanbanBase {
  priority: TaskPriority;
  status: TaskStatus;
  estimatedTime: number;
  assignedUserId: ID | null;
  userStoryId: ID;
  startedAt: Date | null;
  completedAt: Date | null;
}

// wydziely podtypy w zaleznosci od statusu zadanie
// export type NewTask = {
//   userId: null;
//   startedAt: null;
//   completedAt: null;
// } & Task;

// export type AssignedTask = {
//   userId: ID;
//   startedAt: Date;
//   completedAt: null;
// } & Task;

// export type CompletedTask = {
//   userId: ID;
//   startedAt: Date;
//   completedAt: Date;
// } & Task;
