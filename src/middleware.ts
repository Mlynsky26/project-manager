import { stackMiddlewares } from "./middlewares/stackMiddleware";
import { withAuthentication } from "./middlewares/withAuthentication";

const middlewares = [withAuthentication];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icon.svg).*)",
  ],
};
