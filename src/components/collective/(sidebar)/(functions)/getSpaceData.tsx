export function getSpaceData(
  textSpaces: Json[],
  iconMap: { [key: string]: React.ReactNode }
) {
  return textSpaces
    ?.map((space) =>
      space
        ? {
            id:
              space && typeof space === "object" && !Array.isArray(space)
                ? space.slug
                : null,
            name:
              space && typeof space === "object" && !Array.isArray(space)
                ? space.name
                : null,
            icon:
              space &&
              typeof space === "object" &&
              !Array.isArray(space) &&
              typeof space.type === "string"
                ? iconMap[space.type as keyof typeof iconMap]
                : null,
          }
        : null
    )
    .filter(Boolean) as {
    icon: React.ReactNode;
    name: string;
    id: string;
  }[];
}
