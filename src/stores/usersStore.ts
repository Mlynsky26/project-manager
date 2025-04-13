import { apiRoutes } from "@/lib/routes/apiRoutes";
import ID from "@/types/id";
import User from "@/types/user";
import { createStore } from "zustand/vanilla";

export type UsersState = {
  users: User[];
};

export type UsersActions = {
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: ID) => Promise<void>;
  getUserById: (id: ID) => User | null;
};

export type UsersStore = UsersState & UsersActions;

export const defaultInitState: UsersState = {
  users: [],
};

export const createUsersStore = (initState: UsersState = defaultInitState) => {
  return createStore<UsersStore>((set, get) => ({
    ...initState,
    addUser: async (user: User) => {
      const response = await fetch(apiRoutes.users.base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to add user");
      const newUser = await response.json();
      set((state) => ({ users: [...state.users, newUser] }));
    },

    updateUser: async (user: User) => {
      const response = await fetch(apiRoutes.users.byId(user.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: user.displayName,
          photoURL: user.photoURL,
          activeProjectId: user.activeProjectId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update user");
      }

      const updatedUser = await response.json();
      set((state) => ({
        users: state.users.map((u) => (u.id === user.id ? updatedUser : u)),
      }));
    },

    deleteUser: async (id: ID) => {
      const response = await fetch(apiRoutes.users.byId(id), {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    },

    getUserById: (id: ID) => {
      return get().users.find((u) => u.id === id) || null;
    },
  }));
};
