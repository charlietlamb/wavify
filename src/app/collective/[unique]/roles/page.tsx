import getUser from '@/app/actions/getUser'
import CollectiveRoles from '@/components/collective/CollectiveRoles'
import { getCollective } from '../[space_slug]/(functions)/getCollective'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getColUser } from '../(functions)/getColUser'
import { getRoles } from './(functions)/getRoles'

export default async function RolesPage({
  params,
}: {
  params: { unique: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const user = await getUser()
  const collective = await getCollective(supabase, params.unique)
  if (!user || !collective) return redirect('/')
  const colUser = await getColUser(user, collective, supabase)
  if (!colUser) return redirect('/')
  const roles = await getRoles(collective, supabase)
  if (!colUser.roles?.canRoles || !Array.isArray(roles))
    return redirect(`/collective/${collective.unique}`)
  return <CollectiveRoles />
}
