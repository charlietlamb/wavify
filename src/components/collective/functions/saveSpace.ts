export async function saveSpace(supabase: Supabase, user: User, space: Space) {
  const { error } = await supabase
    .from('saves')
    .insert({ user: user.id, space: space.id })
  if (error) throw error
}
