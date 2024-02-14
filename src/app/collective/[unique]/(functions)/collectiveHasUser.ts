export function collectiveHasUser(user: User, colUsers: ColUserAndData[]) {
  return colUsers.some((colUser) => colUser.users.id === user.id);
}
