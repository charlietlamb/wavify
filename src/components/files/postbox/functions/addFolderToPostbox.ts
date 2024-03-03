import { v4 as uuidv4 } from 'uuid'

export async function addFolderToPostbox(
  supabase: Supabase,
  user: User,
  space: Space,
  id: string
) {
  const folderToInsert = {
    id: uuidv4(),
    user: user.id,
    space: space.id,
    folder: id,
  }
  const { error } = await supabase.from('postboxes').insert(folderToInsert)
  if (error) throw error
}
