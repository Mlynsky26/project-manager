import { apiRoutes } from "./apiRoutes";
import { routes } from "./routes";

const PUBLIC_ROUTES = [routes.home, routes.auth.signIn, routes.auth.signUp];
const PUBLIC_API_ROUTES = [
  apiRoutes.auth.signIn.email,
  apiRoutes.auth.signUp.email,
  apiRoutes.auth.getSession,
];

const PUBLIC_PATHS = [...PUBLIC_ROUTES, ...PUBLIC_API_ROUTES];

export default PUBLIC_PATHS;
