import { v4 as uuid } from 'uuid'
import { Dispatch, SetStateAction } from "react";
import { Task } from "@/models/Task";
import { BaseTask } from "@/models/BaseTask";
import { TaskService } from "@/services/TaskService";

export class TaskModifiers {
    static getModifiers(
        tasks: Task[],
        setTasks: Dispatch<SetStateAction<Task[]>>,
        currentProjectId: string,
    ): TaskModifiersType {
        const addTask = (task: BaseTask) => {
            const newTask = { id: uuid(), ...task };
            TaskService.add(newTask)
            setTasks(TaskService.getAllForProject(currentProjectId));
        };

        const getTask = (taskId: string): Task | null => {
            return tasks.find(task => task.id === taskId) ?? null
        };

        const updateTask = (taskId: string, taskPartial: Partial<Task>) => {
            TaskService.update(taskId, taskPartial)
            setTasks(TaskService.getAllForProject(currentProjectId));
        };

        const deleteTask = (taskId: string) => {
            TaskService.delete(taskId)
            setTasks(TaskService.getAllForProject(currentProjectId));
        };

        return {
            addTask,
            getTask,
            updateTask,
            deleteTask
        }
    }
}

export type TaskModifiersType = {
    addTask: (task: BaseTask) => void
    getTask: (taskId: string) => Task | null
    updateTask: (taskId: string, taskPartial: Partial<Task>) => void
    deleteTask: (taskId: string) => void
}