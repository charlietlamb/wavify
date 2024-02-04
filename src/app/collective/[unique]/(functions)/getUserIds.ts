import isObject from "@/lib/isObject";

export function getUserIds(collective: Collective) {
  return Array.isArray(collective.users)
    ? collective.users.map((user: Json) => (isObject(user) ? user.id : ""))
    : [];
}
