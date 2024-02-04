import isObject from "@/lib/isObject";

export function collectiveHasUser(user: User, collective: Collective) {
  return (
    Array.isArray(collective.users) &&
    collective.users.some(
      (col_user: Json) => isObject(col_user) && col_user.id === user.id
    )
  );
}
