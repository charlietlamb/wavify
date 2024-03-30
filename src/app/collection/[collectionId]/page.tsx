import CollectionSingle from '@/components/collection/CollectionSingle'
import { getCollectionFromId } from '@/components/saved/functions/getCollectionFromId'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function page({
  params,
}: {
  params: { collectionId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const collection = await getCollectionFromId(supabase, params.collectionId)
  return <CollectionSingle collection={collection} />
}
