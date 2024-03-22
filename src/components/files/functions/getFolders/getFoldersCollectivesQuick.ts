import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFoldersCollectivesQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('username,profile_pic_url')
    .eq('id', userId)
    .single()
  if (userError) throw userError
  const { data, error } = await supabase
    .from('colUsers')
    .select('*,collectives(*)')
    .eq('user', userId)
  if (error) throw error
  const collectives = data.map(
    (colUser: ColUser & { collectives: Collective }) => colUser.collectives
  )
  const colFolders = collectives.map(
    (col: Collective) =>
      ({
        id: col.id,
        name: col.unique,
        parent: null,
        user: userId,
        users: user,
      }) as FolderAndSender
  )
  return colFolders
}
