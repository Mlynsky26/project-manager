export class ActiveProjectService {
    private static STORAGE_KEY = "activeProject";

    static setActiveProject(projectId: string) {
        if (typeof window !== "undefined") {
            localStorage.setItem(this.STORAGE_KEY, projectId);
        }
    }

    static getActiveProject(): string {
        if (typeof window !== "undefined") {
            return localStorage.getItem(this.STORAGE_KEY) ?? '';
        }
        return ''
    }

    static clearActiveProject() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
