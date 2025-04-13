"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

import { createTasksStore, TasksStore, TasksState } from "@/stores/tasksStore";
import Spinner from "@/components/shared/elements/spinner";
import { ProviderProps } from "../types/props/providerProps";
import Task from "@/types/task";
import { apiRoutes } from "@/lib/routes/apiRoutes";
import generateFetchUrl from "@/lib/utils/generateFetchUrl";

export type TasksStoreApi = ReturnType<typeof createTasksStore>;

export const TasksStoreContext = createContext<TasksStoreApi | undefined>(
  undefined
);

export const TasksStoreProvider = ({
  children,
  specification,
}: ProviderProps<Task>) => {
  const [initialState, setInitialState] = useState<TasksState>({
    tasks: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const url = generateFetchUrl<Task>(apiRoutes.tasks.base, specification);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasks = await response.json();
        setInitialState({ tasks });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setInitialState({ tasks: [] });
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
    <TasksStoreContext.Provider value={createTasksStore(initialState)}>
      {children}
    </TasksStoreContext.Provider>
  );
};

export const useTasksStore = <T,>(selector: (store: TasksStore) => T): T => {
  const tasksStoreContext = useContext(TasksStoreContext);

  if (!tasksStoreContext) {
    throw new Error(`useTasksStore must be used within TasksStoreProvider`);
  }

  return useStore(tasksStoreContext, selector);
};
