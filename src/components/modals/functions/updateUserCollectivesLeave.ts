export async function updateUserCollectivesLeave(
  supabase: Supabase,
  user: User,
  updatedCollectives: Json[]
) {
  const { error } = await supabase
    .from("users")
    .update({ collectives: updatedCollectives })
    .eq("id", user.id)
    .select();
  if (error) throw error;
}
