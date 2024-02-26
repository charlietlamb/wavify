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
  const initSearchFiles = await getUserFiles(supabase, user)
  const initFiles: FileAndSender[] = await getUserTopFiles(supabase, user)
  const initFolders: FolderAndSender[] = await getUserTopFolders(supabase, user)
  return (
    <div className="flex w-full flex-col">
      <FilesProvider
        initSearchFiles={initSearchFiles}
        initFiles={initFiles}
        initFolders={initFolders}
      >
        <FilesDashboardHeader />
        <div className="flex max-h-full w-full flex-grow">
          <FilesSidebarWrap />
          <FilesDashboard />
        </div>
      </FilesProvider>
    </div>
  )
}
