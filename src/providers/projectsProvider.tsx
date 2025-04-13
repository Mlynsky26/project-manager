"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

import {
  createProjectsStore,
  ProjectsState,
  ProjectsStore,
} from "@/stores/projectsStore";
import Spinner from "@/components/shared/elements/spinner";
import { ProviderProps } from "../types/props/providerProps";
import Project from "@/types/project";
import { apiRoutes } from "@/lib/routes/apiRoutes";
import generateFetchUrl from "@/lib/utils/generateFetchUrl";

export type ProjectsStoreApi = ReturnType<typeof createProjectsStore>;

export const ProjectsStoreContext = createContext<ProjectsStoreApi | undefined>(
  undefined
);

export const ProjectsStoreProvider = ({
  children,
  specification,
}: ProviderProps<Project>) => {
  const [initialState, setInitialState] = useState<ProjectsState>({
    projects: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const url = generateFetchUrl<Project>(
          apiRoutes.projects.base,
          specification
        );

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projects = await response.json();
        setInitialState({ projects });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setInitialState({ projects: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialState();
  }, [specification]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ProjectsStoreContext.Provider value={createProjectsStore(initialState)}>
      {children}
    </ProjectsStoreContext.Provider>
  );
};

export const useProjectsStore = <T,>(
  selector: (store: ProjectsStore) => T
): T => {
  const projectsStoreContext = useContext(ProjectsStoreContext);

  if (!projectsStoreContext) {
    throw new Error(
      `useProjectsStore must be used within ProjectsStoreProvider`
    );
  }

  return useStore(projectsStoreContext, selector);
};
