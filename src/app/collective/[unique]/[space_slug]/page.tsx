import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import getUser from '@/app/actions/getUser'
import { getSearchFilesData } from '@/app/user/[user_id]/chat/(functions)/getSearchFilesData'
import { getSpace } from './(functions)/getSpace'
import { getChatSpace } from './(functions)/getChatSpace'
import { getCollective } from './(functions)/getCollective'
import Space from '@/components/collective/Space'
import Library from '@/components/collective/library/Library'
import { getLibrarySearchFiles } from '@/app/library/functions/getLibrarySearchFiles'
import { getFolder } from '@/components/files/functions/getFolders/getFolder'
import { getFilesFromParent } from '@/components/files/functions/getFilesFromParent'
import { getFoldersFromParent } from '@/components/files/functions/getFolders/getFoldersFromParent'
import { getPostboxSearchFiles } from '@/components/collective/postbox/functions/getPostboxSearchFiles'
import { getPostboxTopFolders } from '@/components/collective/postbox/functions/getPostboxTopFolders'
import Postbox from '@/components/collective/postbox/Postbox'
import { getColUser } from '../(functions)/getColUser'
import { getPostboxUsers } from '@/components/files/postbox/functions/getPostboxUsers'
import Transient from '@/components/collective/transient/Transient'
import { getTransientFolders } from '@/components/collective/transient/functions/getTransientFolders'
import { getTransientSchedule } from '@/components/collective/transient/functions/getTransientSchedule'
import { getTransientSchedules } from '@/components/collective/transient/functions/getTransientSchedules'
import { getFeedbackUserFolders } from '@/components/collective/feedback/functions/getFeedbackUserFolders'
import { getFeedbackUserFiles } from '@/components/collective/feedback/functions/getFeedbackUserFiles'
import Feedback from '@/components/collective/feedback/Feedback'
import { getUserFeedbackFiles } from '@/components/collective/feedback/functions/getUserFeedbackFiles'
import { getUserFeedbackFolders } from '@/components/collective/feedback/functions/getUserFeedbackFolders'

interface spacePageParams {
  unique: string
  space_slug: string
}

interface spacePageProps {
  params: spacePageParams
}

export default async function page({ params }: spacePageProps) {
  const supabase = createServerComponentClient({ cookies })
  const user = await getUser()
  if (!user) redirect('/account')
  const collective = await getCollective(supabase, params.unique)
  if (!collective) redirect(`/`)
  const colUser = await getColUser(user, collective, supabase)
  const space: Space = await getSpace(collective, params.space_slug, supabase)
  if (!space || Array.isArray(space)) redirect(`/collective/${params.unique}`)
  let chat: Chat | null = null
  let searchFilesData
  if (space.type === 'text') {
    chat = await getChatSpace(collective, space)
    if (!chat) return redirect(`/`)
    searchFilesData = await getSearchFilesData(supabase, chat)
  }
  if (space.type === 'library' && space.folder) {
    const initSearchFiles = await getLibrarySearchFiles(supabase, space)
    const initFiles: FileAndSender[] = await getFilesFromParent(
      supabase,
      space.folder
    )
    const initFolders: FolderAndSender[] = await getFoldersFromParent(
      supabase,
      space.folder
    )

    return (
      <Library
        space={space}
        initSearchFiles={initSearchFiles}
        initFiles={initFiles}
        initFolders={initFolders}
      />
    )
  }

  if (space.type === 'postbox') {
    const canReceive = space.pbReceive.includes(colUser.roles.id)
    const canSend = space.pbSend.includes(colUser.roles.id)
    if (!canReceive && !canSend) return redirect(`/collective/${params.unique}`)

    const initSearchFiles = await getPostboxSearchFiles(supabase, space)
    const initFiles: FileAndSender[] = []
    const initFolders: FolderAndSender[] = canReceive
      ? await getPostboxUsers(supabase, space)
      : await getPostboxTopFolders(supabase, space, user.id)

    return (
      <Postbox
        space={space}
        initSearchFiles={initSearchFiles}
        initFiles={initFiles}
        initFolders={initFolders}
      />
    )
  }

  if (space.type === 'transient') {
    const canPost = space.tPost.includes(colUser.roles.id)
    const canAccess = space.tAccess.includes(colUser.roles.id)
    if (!canPost && !canAccess) return redirect(`/collective/${params.unique}`)

    const initSearchFiles: FileAndSender[] = []
    const initFiles: FileAndSender[] = []
    const schedule: Schedule | undefined = await getTransientSchedule(
      supabase,
      space
    )
    const initFolders: FolderAndSender[] = await getTransientFolders(
      supabase,
      space,
      schedule
    )
    const schedules: Schedule[] = await getTransientSchedules(supabase, space)
    return (
      <Transient
        space={space}
        initSearchFiles={initSearchFiles}
        initFiles={initFiles}
        initFolders={initFolders}
        initSchedules={schedules}
      />
    )
  }

  if (space.type === 'feedback') {
    // const canGet = space.fGet.includes(colUser.roles.id)
    // const canGive = space.fGive.includes(colUser.roles.id)
    // if (!canGet && !canGive) return redirect(`/collective/${params.unique}`)

    // const initSearchFiles: FileAndSender[] = []
    // const initFiles: FileAndSender[] = canGive
    //   ? []
    //   : await getUserFeedbackFiles(supabase, user, space)
    // const initFolders: FolderAndSender[] = canGive
    //   ? await getFeedbackUserFolders(supabase, space)
    //   : await getUserFeedbackFolders(supabase, user, space)

    return (
      <Feedback
        space={space}
        initSearchFiles={[]}
        initFiles={[]}
        initFolders={[]}
      />
    )
  }

  return <Space space={space} chat={chat} searchFilesData={searchFilesData} />
}
