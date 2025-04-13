"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";
import { createUsersStore, UsersStore } from "@/stores/usersStore";
import Spinner from "@/components/shared/elements/spinner";
import { ProviderProps } from "../types/props/providerProps";
import User from "@/types/user";
import { apiRoutes } from "@/lib/routes/apiRoutes";
import generateFetchUrl from "@/lib/utils/generateFetchUrl";

export type UsersStoreApi = ReturnType<typeof createUsersStore>;

export const UsersStoreContext = createContext<UsersStoreApi | undefined>(
  undefined
);

export const UsersProvider = ({
  children,
  specification,
}: ProviderProps<User>) => {
  const [initialState, setInitialState] = useState<{ users: User[] }>({
    users: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = generateFetchUrl<User>(apiRoutes.users.base, specification);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        setInitialState({ users });
      } catch (error) {
        console.error("Error fetching users:", error);
        setInitialState({ users: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [specification]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <UsersStoreContext.Provider value={createUsersStore(initialState)}>
      {children}
    </UsersStoreContext.Provider>
  );
};

export const useUsersStore = <T,>(selector: (store: UsersStore) => T): T => {
  const usersStoreContext = useContext(UsersStoreContext);

  if (!usersStoreContext) {
    throw new Error(`useUsersStore must be used within UsersProvider`);
  }

  return useStore(usersStoreContext, selector);
};
