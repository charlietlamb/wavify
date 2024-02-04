export function getUpdatedUsers(user: User, collective: Collective) {
  return Array.isArray(collective.users)
    ? collective.users.filter((user1): user1 is colUser => {
        return (
          user1 != null &&
          typeof user1 === "object" &&
          !Array.isArray(user1) &&
          user.id !== user1.id
        );
      })
    : [];
}
