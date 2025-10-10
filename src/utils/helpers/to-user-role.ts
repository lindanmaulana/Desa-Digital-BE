import { UserRole } from "@prisma/client";
import { BadrequestError } from "../errors";

export const toUserRole = (role: string): UserRole => {
  if (Object.values(UserRole).includes(role as UserRole)) {
    return role as UserRole;
  }

  throw new BadrequestError(`Invalid role: ${role}`);
}
