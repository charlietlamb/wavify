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
        roles (*),
        users (*)
    `
    )
    .eq("user", id)
    .eq("collective", collective.id);
  if (error) throw error;
  if (Array.isArray(data) && data.length > 0) {
    return data[0] as unknown as ColUserAndData;
  } else {
    return data as unknown as ColUserAndData;
  }
}
