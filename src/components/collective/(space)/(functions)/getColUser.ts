export function getColUser(user: User, collective: Collective) {
  return Array.isArray(collective.users)
    ? collective.users.find(
        (user1: Json) =>
          user1 &&
          typeof user1 === "object" &&
          !Array.isArray(user1) &&
          user1.id === user.id
      )
    : [];
}
