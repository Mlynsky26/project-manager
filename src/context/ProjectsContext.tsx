'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ActiveProjectService } from '../services/ActiveProjectService';
import { ProjectService } from '../services/ProjectService';
import { Project } from '@/models/Project';
import { Story } from '@/models/Story';
import { StoryService } from '@/services/StoryService';
import { ProjectModifiers, ProjectModifiersType } from './ProjectModifiers';
import { Task } from '@/models/Task';
import { StoryModifiers, StoryModifiersType } from './StoryModifiers';
import { TaskModifiers, TaskModifiersType } from './TaskModifiers';
import { TaskService } from '@/services/TaskService';

export type ProjectContextType = ProjectModifiersType & StoryModifiersType & TaskModifiersType & {
    projects: Project[]
    stories: Story[]
    tasks: Task[]
    currentProjectId: string
};

type ProjectsProviderProps = {
    children: ReactNode
}

const ProjectsContext = createContext<ProjectContextType>(null as unknown as ProjectContextType);

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProjectId, setCurrentProjectId] = useState('');
    const [stories, setStories] = useState<Story[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setProjects(ProjectService.getAll())
        setCurrentProjectId(ActiveProjectService.getActiveProject())
        setStories(StoryService.getAllForProject(currentProjectId))
        setTasks(TaskService.getAllForProject(currentProjectId))
    }, []);
    
    useEffect(() => {
        setStories(StoryService.getAllForProject(currentProjectId))
        setTasks(TaskService.getAllForProject(currentProjectId))
    }, [currentProjectId])

    return (
        <ProjectsContext.Provider value={{
            projects,
            stories,
            tasks,
            currentProjectId,
            ...ProjectModifiers.getModifiers(projects, setProjects, currentProjectId, setCurrentProjectId),
            ...StoryModifiers.getModifiers(stories, setStories, currentProjectId),
            ...TaskModifiers.getModifiers(tasks, setTasks, currentProjectId),
        }}>
            {children}
        </ProjectsContext.Provider>
    );
}

export const useProjects = () => useContext(ProjectsContext)