export async function getColUsers(supabase: Supabase, collective: Collective) {
  const { data, error } = await supabase
    .from("colUsers")
    .select(
      `
            *,
            roles (*),
            users (*)
        `
    )
    .eq("collective", collective.id);
  if (error) throw error;
  return data as unknown as ColUserAndData[];
}
