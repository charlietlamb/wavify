import isObject from "@/lib/isObject";

export function collectiveHasUser(user: User, collective: Collective) {
  return Array.isArray(collective.users)
    ? collective.users.includes(user.id)
    : false;
}
