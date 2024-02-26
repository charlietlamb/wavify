'use server'
import { redirect } from 'next/navigation'
import getUser from '@/app/actions/getUser'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import CollectiveSidebar from '@/components/collective/CollectiveSidebar'
import { getCollective } from './[space_slug]/(functions)/getCollective'
import isObject from '@/lib/isObject'
import { handleNewUser } from './(functions)/handleNewUser'
import { collectiveHasUser } from './(functions)/collectiveHasUser'
import { getDefaultRole } from './(functions)/getDefaultRole'
import { getRoles } from './roles/(functions)/getRoles'
import { getColUsers } from '@/components/modals/functions/getColUsers'
import { getAllSpaces } from './(functions)/getAllSpaces'
import { getColUserDataFromUserAndCol } from '@/components/collective/(sidebar)/(functions)/getColUserDataFromUserAndCol'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { CollectiveProvider } from '@/components/providers/CollectiveProvider'
import CollectiveToggle from '@/components/collective/CollectiveToggle'
import CollectiveSidebarWrap from '@/components/collective/CollectiveSidebarWrap'

export default async function CollectiveLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { unique: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const user = await getUser()
  if (!isObject(user)) return redirect('/account')
  const collective = await getCollective(supabase, params.unique)
  if (!collective) {
    return redirect('/')
  }
  const initColUsers = await getColUsers(supabase, collective)
  const roles = await getRoles(collective, supabase)
  const defaultRole: Role = getDefaultRole(roles)
  let newColUser = null
  if (!collectiveHasUser(user, initColUsers)) {
    newColUser = await handleNewUser(
      user,
      collective,
      supabase,
      params.unique,
      defaultRole
    )
  }
  let colUsers: ColUserAndData[] = []
  if (newColUser) {
    colUsers = [...initColUsers, newColUser]
  } else {
    colUsers = initColUsers
  }
  const colUser = (await getColUserDataFromUserAndCol(
    supabase,
    user,
    collective
  )) as unknown as ColUserAndData
  if (!colUser) {
    return redirect('/')
  }
  const spaces = await getAllSpaces(collective, supabase)

  return (
    <CollectiveProvider
      collective={collective}
      colUser={colUser}
      colUsers={colUsers}
      roles={roles}
      spaces={spaces}
    >
      <ResizablePanelGroup
        className="flex h-auto flex-grow"
        direction="horizontal"
      >
        <CollectiveSidebarWrap />
        <ResizablePanel
          className="relative flex w-full"
          defaultSize={85}
          minSize={60}
        >
          <CollectiveToggle />
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </CollectiveProvider>
  )
}
