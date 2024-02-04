import isObject from "@/lib/isObject";

export function getColUser(user: User, collective: Collective) {
  return Array.isArray(collective.users)
    ? collective.users.find(
        (col_user: Json) => isObject(col_user) && col_user.id === user.id
      )
    : undefined;
}
