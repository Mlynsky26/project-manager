'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ActiveProjectService } from '../services/ActiveProjectService';
import { ProjectService } from '../services/ProjectService';
import { Project } from '@/models/Project';
import { Story } from '@/models/Story';
import { StoryService } from '@/services/StoryService';
import { ProjectsModifier, ProjectsModifiersType } from './ProjectsModifier';
import { StoriesModifier, StoriesModifiersType } from './StoriesModifier';

export type ProjectContextType = ProjectsModifiersType & StoriesModifiersType & {
    projects: Project[]
    stories: Story[]
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

    useEffect(() => {
        setProjects(ProjectService.getAll())
        setCurrentProjectId(ActiveProjectService.getActiveProject())
        setStories(StoryService.getAllForProject(currentProjectId))
    }, []);
    
    useEffect(() => {
        setStories(StoryService.getAllForProject(currentProjectId))
    }, [currentProjectId])

    return (
        <ProjectsContext.Provider value={{
            projects,
            stories,
            currentProjectId,
            ...ProjectsModifier.getModifiers(projects, setProjects, currentProjectId, setCurrentProjectId),
            ...StoriesModifier.getModifiers(stories, setStories, currentProjectId)
        }}>
            {children}
        </ProjectsContext.Provider>
    );
}

export const useProjects = () => useContext(ProjectsContext)