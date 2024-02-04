export async function updateUsersLeave(
  supabase: Supabase,
  updatedUsers: colUser[],
  collective: Collective
) {
  const { data, error } = await supabase
    .from("collectives")
    .update({ users: updatedUsers })
    .eq("id", collective.id)
    .select();
  if (error) throw error;
  return data;
}
