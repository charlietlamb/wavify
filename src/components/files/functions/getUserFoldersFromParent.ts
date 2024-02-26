export async function getUserFoldersFromParent(
  supabase: Supabase,
  user: User,
  parent: string
) {
  let toReturn: FolderAndSender[] = []
  try {
    const { data, error } = await supabase
      .from('folders')
      .select('*, user(username, profile_pic_url)')
      .eq('user', user.id)
      .eq('parent', parent)
      .order('createdAt', { ascending: false })
    if (error) throw error

    toReturn = data ? (data as FolderAndSender[]) : []
  } catch {
  } finally {
    return toReturn
  }
}
