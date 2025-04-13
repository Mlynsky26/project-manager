import ID from "@/types/id";

export const routes = {
  home: "/",
  user: {
    profile: "/user/profile",
  },
  auth: {
    signIn: "/auth/signIn",
    signUp: "/auth/signUp",
  },
  projects: {
    index: "/projects",
    create: "/projects/create",
  },
  userStories: {
    index: `/userStories`,
    create: `/userStories/create`,
    tasks: {
      index: (userStoryId: ID) => `/userStories/${userStoryId}/tasks`,
      create: (userStoryId: ID) => `/userStories/${userStoryId}/tasks/create`,
    },
  },
} as const;
