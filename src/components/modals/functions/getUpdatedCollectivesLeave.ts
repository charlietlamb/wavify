export function getUpdatedCollectivesLeave(
  userToGo: User,
  collective: Collective
) {
  const updatedCollectives =
    userToGo && Array.isArray(userToGo.collectives)
      ? userToGo?.collectives.filter((collectiveToGo: Json) => {
          return (
            collectiveToGo != null &&
            typeof collectiveToGo === "object" &&
            !Array.isArray(collectiveToGo) &&
            collective.id !== collectiveToGo.id
          );
        })
      : [];
  return updatedCollectives;
}
