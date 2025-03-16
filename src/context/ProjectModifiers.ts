import { BaseProject } from "@/models/BaseProject";
import { Project } from "@/models/Project";
import { ActiveProjectService } from "@/services/ActiveProjectService";
import { ProjectService } from "@/services/ProjectService";
import { v4 as uuid } from 'uuid'
import { Dispatch, SetStateAction } from "react";

export class ProjectModifiers {
    static getModifiers(
        projects: Project[],
        setProjects: Dispatch<SetStateAction<Project[]>>,
        currentProjectId: string,
        setCurrentProjectId: Dispatch<SetStateAction<string>>,
    ): ProjectModifiersType {
        const addProject = (project: BaseProject) => {
            const newProject = { id: uuid(), name: project.name, description: project.description };
            ProjectService.add(newProject)
            setProjects(ProjectService.getAll());
        };

        const getProject = (projectId: string): Project | null => {
            return projects.find(project => project.id === projectId) ?? null
        };

        const updateProject = (projectId: string, projectPartial: Partial<Project>) => {
            ProjectService.update(projectId, projectPartial)
            setProjects(ProjectService.getAll());
        };

        const deleteProject = (projectId: string) => {
            ProjectService.delete(projectId)
            setProjects(ProjectService.getAll());
        };

        const isProjectCurrent = (projectId: string) => {
            return projectId === currentProjectId
        }

        const markAsCurrentProject = (projectId: string) => {
            ActiveProjectService.setActiveProject(projectId)
            setCurrentProjectId(ActiveProjectService.getActiveProject())
        }

        return {
            addProject,
            getProject,
            updateProject,
            deleteProject,
            isProjectCurrent,
            markAsCurrentProject
        }
    }
}

export type ProjectModifiersType = {
    addProject: (project: BaseProject) => void
    getProject: (projectId: string) => Project | null
    updateProject: (projectId: string, projectPartial: Partial<Project>) => void
    deleteProject: (projectId: string) => void
    markAsCurrentProject: (projectId: string) => void
    isProjectCurrent: (projectId: string) => boolean
}