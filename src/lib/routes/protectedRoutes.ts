import { apiRoutes } from "./apiRoutes";
import { PathEntry } from "./PathEntry";
import { routes } from "./routes";

const PROTECTED_PAGES_ROUTES = [
    routes.user.profile,
    routes.projects.index,
    routes.projects.create,
    routes.userStories.index,
    routes.userStories.create,
    routes.userStories.tasks.index,
    routes.userStories.tasks.create,
    routes.userStories.tasks.double,
];

const PROTECTED_API_ROUTES = [
    apiRoutes.auth.updateUser.update,
    apiRoutes.projects.base,
    apiRoutes.projects.byId,
    apiRoutes.tasks.base,
    apiRoutes.tasks.byId,
    apiRoutes.userStories.base,
    apiRoutes.userStories.byId,
    apiRoutes.users.base,
];

const PROTECTED_ROUTES: PathEntry[] = [...PROTECTED_PAGES_ROUTES, ...PROTECTED_API_ROUTES];

export default PROTECTED_ROUTES;
