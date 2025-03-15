import { Project } from "@/models/Project";

export class ProjectService {
    static key = 'projects'

    static getAll(): Project[] {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : [];
        }
        return []
    }

    static getById(id: string): Project | undefined {
        return this.getAll().find((item) => item.id === id);
    }

    private static save(items: Project[]): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.key, JSON.stringify(items));
        }
    }

    static add(item: Project): void {
        const items = this.getAll();
        items.push(item);
        this.save(items);
    }

    static update(id: string, updatedItem: Partial<Project>): void {
        const items = this.getAll().map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
        );
        this.save(items);
    }

    static delete(id: string): void {
        this.save(this.getAll().filter((item) => item.id !== id));
    }
}