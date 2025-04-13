import ID from "@/types/id";

export const apiRoutes = {
  projects: {
    base: "/api/projects",
    byId: (id: ID) => `/api/projects/${id}`,
  },
  tasks: {
    base: "/api/tasks",
    byId: (id: ID) => `/api/tasks/${id}`,
  },
  userStories: {
    base: "/api/user-stories",
    byId: (id: ID) => `/api/user-stories/${id}`,
  },
  users: {
    base: "/api/users",
    byId: (id: ID) => `/api/users/${id}`,
  },
  auth: {
    signIn: {
      email: "/api/auth/sign-in/email",
    },
    signUp: {
      email: "/api/auth/sign-up/email",
    },
    getSession: "/api/auth/get-session",
  },
};
