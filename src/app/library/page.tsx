import { redirect } from 'next/navigation'
import getUser from '../actions/getUser'
import FilesDashboard from '@/components/files/dashboard/FilesDashboard'
import FilesSidebarWrap from '@/components/files/sidebar/FilesSidebarWrap'
import { cookies } from 'next/headers'
import { getUserFiles } from '@/components/files/functions/getUserFiles'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import FilesProvider from '@/components/files/FilesProvider'
import FilesDashboardHeader from '@/components/files/dashboard/FilesDashboardHeader'
import { getUserTopFiles } from '@/components/files/functions/getUserTopFiles'
import { getUserTopFolders } from '@/components/files/functions/getUserTopFolders'

export default async function page() {
  const user = await getUser()
  const supabase = createServerComponentClient({ cookies })
  if (!user) return redirect('/account')
  if (!user.setup_complete) return redirect('/setup')
  const initSearchFiles = await getUserFiles(supabase, user)
  const initFiles: FileAndSender[] = await getUserTopFiles(supabase, user)
  const initFolders: FolderAndSender[] = await getUserTopFolders(supabase, user)
  const initPath: Path = {
    type: 'library/user',
    id: user.id,
    folders: true,
    files: true,
    name: user.username,
  }
  return (
    <div className="flex w-full flex-col ">
      <FilesProvider
        initSearchFiles={initSearchFiles}
        initFiles={initFiles}
        initFolders={initFolders}
        initPath={initPath}
      >
        <FilesDashboardHeader />
        <div className="flex flex-grow overflow-auto">
          <FilesSidebarWrap />
          <FilesDashboard />
        </div>
      </FilesProvider>
    </div>
  )
}
