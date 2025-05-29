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
  },
  auth: {
    signIn: {
      email: "/api/auth/sign-in/email",
      social: "/api/auth/sign-in/social",
    },
    signUp: {
      email: "/api/auth/sign-up/email",
      social: "/api/auth/sign-up/social",
    },
    getSession: "/api/auth/get-session",
    updateUser: {
      update: (userId: ID) => `/api/auth/update-user/${userId}`,
    },
  },
};
