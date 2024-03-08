export async function submitForFeedbackFile(
  supabase: Supabase,
  user: User,
  space: Space,
  file: string
) {
  const newFeedback = {
    space: space.id,
    file: file,
    user: user.id,
  }
  const { error } = await supabase.from('feedbacks').insert(newFeedback)
  if (error) throw error
}
