import ID from "@/types/id";
import User from "@/types/user";
import { createStore } from "zustand/vanilla";

export type UsersState = {
  users: User[];
};

export type UsersActions = {
  getUserById: (id: ID) => User | null;
};

export type UsersStore = UsersState & UsersActions;

export const defaultInitState: UsersState = {
  users: [],
};

export const createUsersStore = (initState: UsersState = defaultInitState) => {
  return createStore<UsersStore>((set, get) => ({
    ...initState,

    getUserById: (id: ID) => {
      return get().users.find((u) => u.id === id) || null;
    },
  }));
};
