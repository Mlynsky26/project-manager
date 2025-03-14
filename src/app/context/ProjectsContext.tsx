'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { v4 as uuid } from 'uuid'
import { User } from './UserContext';

export type Project = {
  id: string
  name: string
  description: string
  current: boolean
};

export type Story = {
  id: string
  name: string
  opis: string
  priority: Priority
  project: Project['id']
  created_at: number
  state: State,
  user: User['id']
}

export enum Priority {
  LOW,
  MEDIUM,
  HIGH
}

export enum State {
  TODO,
  DOING,
  DONE
}

export type ProjectUpdatable = {
  name: Project['name']
  description: Project['description']
};

export type ProjectContextType = {
  projects: Project[]
  addProject: (project: ProjectUpdatable) => void
  getProject: (projectId: string) => Project | null
  updateProject: (project: Project) => void
  markAsCurrentProject: (projectId: string) => void
  isProjectCurrent: (projectId: string) => boolean
};

type ProjectsProviderProps = {
  children: ReactNode
}

const PROJECTS_STORAGE_KEY = 'projects';

const ProjectsContext = createContext<ProjectContextType>(null as unknown as ProjectContextType);

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projectsRaw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (projectsRaw) {
      setProjects(JSON.parse(projectsRaw));
    }

  }, []);

  useEffect(() => {
    console.log(projects)
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: ProjectUpdatable) => {
    const newProject = { id: uuid(), current: false, name: project.name, description: project.description };
    setProjects([...projects, newProject]);
  };

  const updateProject = (project: Project) => {
    const index = projects.findIndex(p => p.id === project.id)
    if (index == -1)
      return

    projects[index] = project
    setProjects([...projects]);
  };

  const getProject = (projectId: string): Project | null => {
    return projects.find(project => project.id === projectId) ?? null
  };

  const getCurrentProject = () => {
    return projects.find(p => p.current) ?? null
  }

  const isProjectCurrent = (projectId: string) => {
    const project = getProject(projectId)
    return project ? project.current : false
  }

  const markAsCurrentProject = (projectId: string) => {
    const project = getProject(projectId)
    if (!project) return

    const current = getCurrentProject()
    if (current) {
      current.current = false
      updateProject(current)
    }

    project.current = true
    updateProject(project)
  }

  return (
    <ProjectsContext.Provider value={{ projects, addProject, getProject, updateProject, markAsCurrentProject, isProjectCurrent }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext)