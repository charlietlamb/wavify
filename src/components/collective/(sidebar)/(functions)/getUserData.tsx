export function getUserData(colUsers: ColUserAndData[]) {
  return colUsers
    ?.map(
      (colUser: ColUserAndData) =>
        colUser && {
          id: colUser.id,
          name: colUser.users?.username,
          icon: colUser.roles?.emoji,
          color: colUser.roles?.color,
        }
    )
    .filter(Boolean) as
    | {
        icon: string;
        name: string;
        id: string;
        color: string;
      }[];
}
