import { getResourceFromId } from '@/components/resource/functions/getResourceFromId'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ResourceSingle from '@/components/resource/ResourceSingle'

export default async function page({
  params,
}: {
  params: { resourceId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const resource = await getResourceFromId(supabase, params.resourceId)
  return <ResourceSingle resource={resource} />
}
