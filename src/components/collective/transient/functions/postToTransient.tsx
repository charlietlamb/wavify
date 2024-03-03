import { v4 as uuidv4 } from 'uuid'

export async function postToTransient(
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
  const { error } = await supabase.from('transients').insert(folderToInsert)
  if (error) throw error
}
