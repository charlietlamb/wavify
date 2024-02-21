export async function setUserColor(
  supabase: Supabase,
  user: User,
  color: string
) {
  const { error } = await supabase
    .from('users')
    .update({ color })
    .eq('id', user.id)
  if (error) throw error
}
