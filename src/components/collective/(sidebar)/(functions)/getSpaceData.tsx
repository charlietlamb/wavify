export function getSpaceData(
  spaces: Space[],
  iconMap: { [key: string]: React.ReactNode }
) {
  return spaces
    ?.map((space) =>
      space
        ? {
            id: space.slug,
            name: space.name,
            icon: iconMap[space.type as keyof typeof iconMap],
            color: "#FFFFFF",
          }
        : null
    )
    .filter(Boolean) as {
    icon: React.ReactNode;
    name: string;
    id: string;
    color: string;
  }[];
}
