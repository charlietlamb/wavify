export async function getUserRoleFromId(
  id: string,
  collective: Collective,
  supabase: Supabase
) {
  const { data, error } = await supabase
    .from("colUsers")
    .select(
      `
        *,
        roles (*)
        users (*)
    `
    )
    .eq("id", id)
    .eq("collective", collective.id);
  if (error) throw error;
  let toReturn;
  if (Array.isArray(data) && data.length > 0) {
    toReturn = data[0];
  } else {
    toReturn = data;
  }
  return data as unknown as ColUserAndData;
}
