export function getDefaultRole(roles: Role[]) {
  return roles?.reduce((prev, current) => {
    return prev.authority > current.authority ? prev : current;
  });
}
