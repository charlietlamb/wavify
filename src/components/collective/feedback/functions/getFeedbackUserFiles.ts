export async function getFeedbackUserFiles(supabase: Supabase, space: Space) {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*,files(*, users(username,profile_pic_url))')
    .eq('space', space.id)
    .not('file', 'is', null)
  if (error) throw error
  const files = data.map(
    (feedback: Feedback & { files: FileAndSender[] }) => feedback.files
  )
  return files.flat() as FileAndSender[]
}
