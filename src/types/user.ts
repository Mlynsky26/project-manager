import { UserRole } from "@prisma/client";
import { Base } from "./base";
import ID from "./id";

export default interface User extends Base {
  email: string;
  name: string | null;
  role: UserRole;
  image: string | null;
  activeProjectId: ID | null;
}

export const mapUsersToSelect = (users: User[]) => {
  return users.map((user) => ({
    label: user.name || user.email || user.id,
    value: user.id,
  }));
};
