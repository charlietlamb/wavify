export async function getUserFeedbackFolders(
  supabase: Supabase,
  user: User,
  space: Space
) {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*,folders(*, users(*))')
    .eq('user', user.id)
    .eq('space', space.id)
    .not('folder', 'is', null)
  if (error) throw error
  const folders = data.map(
    (feedback: Feedback & { folders: FolderAndSender[] }) => feedback.folders
  )
  const toReturnFlat = folders.flat()
  const toReturnMapped = toReturnFlat.map((folder) => {
    return { ...folder, parent: 'fd:' + folder.user }
  })
  return toReturnMapped as FolderAndSender[]
}
