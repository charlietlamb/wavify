import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFoldersCollectiveQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const collectiveId = path[path.length - 1].id
  const userId = path[path.length - 2].id
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('username,profile_pic_url')
    .eq('id', userId)
    .single()
  if (userError) throw userError
  const { data, error } = await supabase
    .from('spaces')
    .select()
    .eq('collective', collectiveId)
  if (error) throw error
  const colFolders = data.map((space: Space) => {
    if (space.type !== 'library') return

    return {
      id: space.id,
      name: space.slug,
      parent: null,
      user: userId,
      users: user,
    }
  })
  return colFolders.filter(Boolean)
}
