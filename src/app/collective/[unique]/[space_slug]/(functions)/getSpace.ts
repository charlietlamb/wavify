export function getSpace(collective: Collective, space_slug: string) {
  return collective &&
    !Array.isArray(collective) &&
    typeof collective === "object" &&
    Array.isArray(collective.spaces)
    ? collective.spaces.find(
        (space: Json) =>
          space &&
          !Array.isArray(space) &&
          typeof space === "object" &&
          space.slug === space_slug
      )
    : null;
}
