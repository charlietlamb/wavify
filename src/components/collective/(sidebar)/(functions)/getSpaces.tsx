import isObject from "@/lib/isObject";

export async function getSpaces(collective: Collective, supabase: Supabase) {
  const { data: spaces, error } = await supabase
    .from("spaces")
    .select()
    .eq("collective", collective.id);
  if (error) throw error;
  if (!spaces) return;
  const textSpaces = spaces.filter(
    (space) => isObject(space) && space.type === "text"
  ) as Space[];
  const audioSpaces = spaces.filter(
    (space) => isObject(space) && space.type === "audio"
  ) as Space[];
  const videoSpaces = spaces.filter(
    (space) => isObject(space) && space.type === "video"
  ) as Space[];
  return { textSpaces, audioSpaces, videoSpaces };
}
