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
import { getFolder } from '@/components/files/functions/getFolder'
import { getFilesFromParent } from '@/components/files/functions/getFilesFromParent'
import { getFoldersFromParent } from '@/components/files/functions/getFoldersFromParent'

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

  return <Space space={space} chat={chat} searchFilesData={searchFilesData} />
}
