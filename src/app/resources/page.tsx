import ResourcesAll from '@/components/resources/ResourcesAll'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function page() {
  const supabase = createServerComponentClient({ cookies })
  return <ResourcesAll />
}
