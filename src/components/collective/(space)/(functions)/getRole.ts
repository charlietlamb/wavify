import { getColUser } from "./getColUser";

export function getRole(user: User, collective: Collective) {
  const colUser = getColUser(user, collective);
  return Array.isArray(collective.roles)
    ? collective.roles.find(
        (role1: Json) =>
          role1 &&
          typeof role1 === "object" &&
          !Array.isArray(role1) &&
          colUser &&
          typeof colUser === "object" &&
          !Array.isArray(colUser) &&
          role1.id === colUser.roleId
      )
    : [];
}
