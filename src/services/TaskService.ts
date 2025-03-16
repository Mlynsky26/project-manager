import { Task } from "@/models/Task";
import { StoryService } from "./StoryService";

export class TaskService {
    static key = 'tasks'

    private static getAll(): Task[] {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : [];
        }
        return []
    }

    static getAllForProject(projectId: string): Task[] {
        const stories = StoryService.getAllForProject(projectId).map(story => story.id)
        return this.getAll().filter((task: Task) => stories.includes(task.story))
    }

    static getById(id: string): Task | undefined {
        return this.getAll().find((item) => item.id === id);
    }

    private static save(items: Task[]): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.key, JSON.stringify(items));
        }
    }

    static add(item: Task): void {
        const items = this.getAll();
        items.push(item);
        this.save(items);
    }

    static update(id: string, updatedItem: Partial<Task>): void {
        const items = this.getAll().map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
        );
        this.save(items);
    }

    static delete(id: string): void {
        this.save(this.getAll().filter((item) => item.id !== id));
    }
}