import isObject from "@/lib/isObject";
import { getColUser } from "./getColUser";

export function getRole(user: User, collective: Collective) {
  const colUser = getColUser(user, collective);
  return Array.isArray(collective.roles)
    ? collective.roles.find(
        (role1: Json) =>
          isObject(role1) && isObject(colUser) && role1.id === colUser.roleId
      )
    : [];
}
