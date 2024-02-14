export async function colUserLeave(
  supabase: Supabase,
  user: User,
  collective: Collective
) {
  const { data, error } = await supabase
    .from("colUsers")
    .delete()
    .eq("user", user.id)
    .eq("collective", collective.id);
  if (error) throw error;
}
