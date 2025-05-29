import { useTasksStore } from "@/providers/tasksProvider";
import UpdateTaskForm from "./forms/updateTaskForm";
import ConfirmModal from "@/components/shared/elements/modals/confirmModal";
import Task from "@/types/task";
import { MdDone } from "react-icons/md";
import AssignUserForm from "./forms/assignUserForm";
import { TaskStatus } from "@prisma/client";
import { useUsersStore } from "@/providers/usersProvider";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils/dateFormat";
import BaseCard from "../../shared/base/baseCard";
import ActionButton from "@/components/shared/elements/actionButton";
import { useSession } from "@/lib/auth/authClient";

export default function TaskCard(task: Task) {
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const getUserById = useUsersStore((state) => state.getUserById);
  const assignedUser = task.assignedUserId
    ? getUserById(task.assignedUserId)
    : null;
  const session = useSession();

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success("Pomyślnie usunięto zadanie");
    } catch {
      toast.error("Nie udało się usunąć zadania");
    }
  };

  const handleMarkAsCompleted = async () => {
    try {
      await updateTask({
        ...task,
        status: TaskStatus.COMPLETED,
        completedAt: new Date(),
      });
      toast.success("Zadanie zostało oznaczone jako ukończone");
    } catch {
      toast.error("Nie udało się oznaczyć zadania jako ukończone");
    }
  };

  const additionalActions = session?.data?.user?.role !== "GUEST"  ? (
    <>
      {task.status === TaskStatus.PENDING && <AssignUserForm task={task} />}
      {task.status === TaskStatus.IN_PROGRESS && (
          <ConfirmModal
            header="Oznaczenie zadania jako ukończone"
            message="Na pewno chcesz oznaczyć zadanie jako ukończone?"
            onConfirm={handleMarkAsCompleted}
            trigger={
              <ActionButton
                variant="default"
                size="icon"
                tooltip="Zakończ zadanie"
              >
                <MdDone />
              </ActionButton>
            }
          />
        )}
    </>
  ) : null;

  const additionalProperties = (
    <>
      <p>
        <strong>Priorytet:</strong>{" "}{task.priority}
      </p>
      <p>
        <strong>Przewidywany czas:</strong>{" "}{task.estimatedTime}
      </p>
      <p>
        <strong>Przypisany użytkownik:</strong>{" "}
        {assignedUser ? assignedUser.name : "N/A"}
      </p>
      <p>
        <strong>Czas rozpoczęcia:</strong>{" "}
        {formatDate(task.startedAt)}
      </p>
      <p>
        <strong>Czas zakończenia:</strong>{" "}
        {formatDate(task.completedAt)}
      </p>
    </>
  );

  return (
    <BaseCard<Task>
      item={task}
      onDelete={handleDelete}
      additionalActions={additionalActions}
      additionalProperties={additionalProperties}
      UpdateFormComponent={UpdateTaskForm}
    />
  );
}
