export async function getUserFeedbackFiles(
  supabase: Supabase,
  user: User,
  space: Space
) {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*,files(*, users(username,profile_pic_url))')
    .eq('user', user.id)
    .eq('space', space.id)
    .not('file', 'is', null)
  if (error) throw error
  const files = data.map(
    (feedback: Feedback & { files: FileAndSender[] }) => feedback.files
  )
  const toReturnFlat = files.flat()
  const toReturnMapped = toReturnFlat.map((file) => {
    return { ...file, folder: 'fd:' + file.user }
  })
  return toReturnMapped as FileAndSender[]
}
