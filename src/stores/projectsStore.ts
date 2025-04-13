import { apiRoutes } from "@/lib/routes/apiRoutes";
import ID from "@/types/id";
import Project from "@/types/project";
import { createStore } from "zustand/vanilla";

export type ProjectsState = {
  projects: Project[];
};

export type ProjectsActions = {
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: ID) => Promise<void>;
  getProjectById: (id: ID) => Project | null;
};

export type ProjectsStore = ProjectsState & ProjectsActions;

export const defaultInitState: ProjectsState = {
  projects: [],
};

export const createProjectsStore = (
  initState: ProjectsState = defaultInitState
) => {
  return createStore<ProjectsState & ProjectsActions>((set, get) => ({
    ...initState,
    addProject: async (
      project: Omit<Project, "id" | "createdAt" | "updatedAt">
    ) => {
      const response = await fetch(apiRoutes.projects.base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error("Failed to create project");
      const newProject = await response.json();
      set((state) => ({
        projects: [newProject, ...state.projects],
      }));
    },
    updateProject: async (updatedProject: Project) => {
      const response = await fetch(apiRoutes.projects.byId(updatedProject.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      if (!response.ok) throw new Error("Failed to update project");
      const updated = await response.json();
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === updatedProject.id ? updated : project
        ),
      }));
    },
    deleteProject: async (id: ID) => {
      const response = await fetch(apiRoutes.projects.byId(id), {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
      }));
    },
    getProjectById: (id: ID) => {
      return get().projects.find((project) => project.id === id) ?? null;
    },
  }));
};
