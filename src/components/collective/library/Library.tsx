import FilesProvider from '@/components/files/FilesProvider'
import FilesDashboard from '@/components/files/dashboard/FilesDashboard'
import FilesDashboardHeader from '@/components/files/dashboard/FilesDashboardHeader'
import FilesSidebarWrap from '@/components/files/sidebar/FilesSidebarWrap'

interface LibraryProps {
  space: Space
  initSearchFiles: FileAndSender[]
  initFiles: FileAndSender[]
  initFolders: FolderAndSender[]
}

export default function Library({
  space,
  initSearchFiles,
  initFiles,
  initFolders,
}: LibraryProps) {
  return (
    <div className="flex w-full flex-col">
      <FilesProvider
        initSearchFiles={initSearchFiles}
        initFiles={initFiles}
        initFolders={initFolders}
        space={space}
      >
        <FilesDashboardHeader />
        <div className="flex flex-grow overflow-y-auto">
          <FilesSidebarWrap />
          <FilesDashboard />
        </div>
      </FilesProvider>
    </div>
  )
}