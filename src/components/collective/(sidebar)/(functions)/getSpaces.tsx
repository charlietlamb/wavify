export function getSpaces(collective: Collective) {
  if (Array.isArray(collective.spaces)) {
    const textSpaces = collective.spaces.filter(
      (space) =>
        space != null &&
        typeof space === "object" &&
        !Array.isArray(space) &&
        space.type === "text"
    ) as Json[];
    const audioSpaces = collective.spaces.filter(
      (space) =>
        space != null &&
        typeof space === "object" &&
        !Array.isArray(space) &&
        space.type === "audio"
    ) as Json[];
    const videoSpaces = collective.spaces.filter(
      (space) =>
        space != null &&
        typeof space === "object" &&
        !Array.isArray(space) &&
        space.type === "video"
    ) as Json[];
    return { textSpaces, audioSpaces, videoSpaces };
  }
  return [];
}
