import FilesProvider from '@/components/files/FilesProvider'
import FilesDashboard from '@/components/files/dashboard/FilesDashboard'
import FilesDashboardHeader from '@/components/files/dashboard/FilesDashboardHeader'
import FilesSidebarWrap from '@/components/files/sidebar/FilesSidebarWrap'

interface LibraryProps {
  space: Space
  initSearchFiles: FileAndSender[]
  initFiles: FileAndSender[]
  initFolders: FolderAndSender[]
  initSchedules: Schedule[]
}

export default function Transient(props: LibraryProps) {
  return (
    <div className="flex w-full flex-col">
      <FilesProvider
        {...props}
        transient={true}
        transientFoldersInit={props.initFolders}
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
