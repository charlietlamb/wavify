import { getCollectiveFromId } from '@/components/nav/functions/getCollectiveFromId'

export async function saveSpace(supabase: Supabase, user: User, space: Space) {
  const collective = await getCollectiveFromId(supabase, space.collective)
  const { error } = await supabase
    .from('saves')
    .insert({
      user: user.id,
      space: space.id,
      name: `${collective.unique}/${space.slug}`,
    })
  if (error) throw error
}
