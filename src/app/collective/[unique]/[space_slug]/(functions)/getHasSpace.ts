export function getHasSpace(collective: Collective, space_slug: string) {
  return Array.isArray(collective.spaces)
    ? collective.spaces.some(
        (space: Json) =>
          space &&
          !Array.isArray(space) &&
          typeof space === "object" &&
          space.slug === space_slug
      )
    : false;
}
