export function getColUserFromData(colUsers: ColUserAndData[], user: User) {
  return colUsers.find((colUser) => colUser.users?.id === user.id);
}
