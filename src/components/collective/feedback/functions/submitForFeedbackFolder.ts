export async function submitForFeedbackFolder(
  supabase: Supabase,
  user: User,
  space: Space,
  folder: string
) {
  const newFeedback = {
    space: space.id,
    folder: folder,
    user: user.id,
  }
  const { error } = await supabase.from('feedbacks').insert(newFeedback)
  if (error) throw error
}
