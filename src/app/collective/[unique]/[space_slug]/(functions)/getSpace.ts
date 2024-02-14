export async function getSpace(
  collective: Collective,
  space_slug: string,
  supabase: Supabase
) {
  const { data, error } = await supabase
    .from("spaces")
    .select()
    .eq("slug", space_slug)
    .eq("collective", collective.id);
  if (error) throw error;
  let returnData = [];
  if (Array.isArray(data)) {
    returnData = data[0];
  } else {
    returnData = data;
  }
  return returnData as unknown as Space;
}
