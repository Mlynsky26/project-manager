import { apiRoutes } from "@/lib/routes/apiRoutes";
import ID from "@/types/id";
import UserStory from "@/types/userStory";
import { createStore } from "zustand/vanilla";

export type UserStoriesState = {
  userStories: UserStory[];
};

export type UserStoriesActions = {
  addUserStory: (userStory: Partial<UserStory>) => Promise<void>;
  updateUserStory: (userStory: UserStory) => Promise<void>;
  deleteUserStory: (id: ID) => Promise<void>;
  getUserStoryById: (id: ID) => UserStory | null;
};

export type UserStoriesStore = UserStoriesState & UserStoriesActions;

export const defaultInitState: UserStoriesState = {
  userStories: [],
};

export const createUserStoriesStore = (
  initState: UserStoriesState = defaultInitState
) => {
  return createStore<UserStoriesState & UserStoriesActions>((set, get) => ({
    ...initState,
    addUserStory: async (userStory: Partial<UserStory>) => {
      const response = await fetch(apiRoutes.userStories.base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userStory),
      });
      if (!response.ok) throw new Error("Failed to create user story");
      const newUserStory = await response.json();
      set((state) => ({
        userStories: [...state.userStories, newUserStory],
      }));
    },
    updateUserStory: async (updatedUserStory: UserStory) => {
      const response = await fetch(
        apiRoutes.userStories.byId(updatedUserStory.id),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUserStory),
        }
      );
      if (!response.ok) throw new Error("Failed to update user story");
      const updated = await response.json();
      set((state) => ({
        userStories: state.userStories.map((userStory) =>
          userStory.id === updatedUserStory.id ? updated : userStory
        ),
      }));
    },
    deleteUserStory: async (id: ID) => {
      const response = await fetch(apiRoutes.userStories.byId(id), {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user story");
      set((state) => ({
        userStories: state.userStories.filter(
          (userStory) => userStory.id !== id
        ),
      }));
    },
    getUserStoryById: (id: ID) => {
      return get().userStories.find((userStory) => userStory.id === id) ?? null;
    },
  }));
};
