import { Story } from "@/models/Story";

export class StoryService {
    static key = 'stories'

    static getAll(): Story[] {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : [];
        }
        return []
    }

    static getAllForProject(projectId: string): Story[] {
        return this.getAll().filter((story: Story) => story.project === projectId)
    }

    static getById(id: string): Story | undefined {
        return this.getAll().find((item) => item.id === id);
    }

    private static save(items: Story[]): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.key, JSON.stringify(items));
        }
    }

    static add(item: Story): void {
        const items = this.getAll();
        items.push(item);
        this.save(items);
    }

    static update(id: string, updatedItem: Partial<Story>): void {
        const items = this.getAll().map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item
        );
        this.save(items);
    }

    static delete(id: string): void {
        this.save(this.getAll().filter((item) => item.id !== id));
    }
}