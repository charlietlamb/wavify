export async function getRoles(collective: Collective, supabase: Supabase) {
  const { data, error } = await supabase
    .from("roles")
    .select()
    .eq("collective", collective.id);
  if (error) throw error;
  return data;
}
