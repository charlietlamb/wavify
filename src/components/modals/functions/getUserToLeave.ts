export async function getUserToLeave(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", user.id)
    .single();
  if (error) throw error;
  return data;
}
