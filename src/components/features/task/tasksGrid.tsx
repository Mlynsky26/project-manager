import Task from "@/types/task";
import TaskCard from "./taskCard";
import GridColumn from "../../shared/layout/gridColumn";
import { TaskStatus } from "@prisma/client";

export default function TasksGrid({ tasks }: { tasks: Task[] }) {

  if (tasks.length === 0) {
    return <p className="text-center">Brak zadań</p>;
  }

  const pendingTasks =
    tasks?.filter((task) => task.status === TaskStatus.PENDING) || [];
  const inProgressTasks =
    tasks?.filter((task) => task.status === TaskStatus.IN_PROGRESS) || [];
  const completedTasks =
    tasks?.filter((task) => task.status === TaskStatus.COMPLETED) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GridColumn
        items={pendingTasks}
        header="Oczekujące"
        emptyMessage="Brak oczekujących zadań"
        Element={TaskCard}
      />
      <GridColumn
        items={inProgressTasks}
        header="W trakcie"
        emptyMessage="Brak zadań w trakcie"
        Element={TaskCard}
      />
      <GridColumn
        items={completedTasks}
        header="Ukończone"
        emptyMessage= "Brak ukończonych zadań"
        Element={TaskCard}
      />
    </div>
  );
}
