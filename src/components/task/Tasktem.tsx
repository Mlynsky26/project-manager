import { Task } from "@/models/Task";
import EditTask from "./EditTask";
import TaskDetails from "./TaskDetails";
import DeleteTask from "./DeleteTask";
import { Button } from "react-bootstrap";
import { useUser } from "@/context/UserContext";
import AssignTask from "./AssignTask";
import { State } from "@/models/State";
import { useProjects } from "@/context/ProjectsContext";

type TaskItemProps = {
    task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
    const { getUser } = useUser()
    const { updateTask } = useProjects()
    const taskUser = task.user ? getUser(task.user) : null

    const markAsFinished = () => {
        task.state = State.DONE
        task.completed_at = new Date().getTime()
        updateTask(task.id, task)
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between flex-wrap gap-2 align-items-center">
                <h5 className="card-title mb-0">
                    {task.name}
                </h5>
                <div className="d-flex gap-1">
                    <EditTask task={task}></EditTask>
                    <TaskDetails task={task}></TaskDetails>
                    <DeleteTask task={task}></DeleteTask>
                </div>
            </div>
            <div className="card-body">
                <p>{task.description}</p>
                <p>State: {task.state}</p>
                <p>Priority: {task.priority}</p>

                {!taskUser ? <AssignTask task={task} /> : null}
                {task.state === State.DOING ? <Button variant="success" onClick={markAsFinished}>Mark as finished</Button> : null}
            </div>
        </div>
    );
};

export default TaskItem;