import FilesProvider from '@/components/files/FilesProvider'
import FilesDashboard from '@/components/files/dashboard/FilesDashboard'
import FilesDashboardHeader from '@/components/files/dashboard/FilesDashboardHeader'
import FilesSidebarWrap from '@/components/files/sidebar/FilesSidebarWrap'

interface PostboxProps {
  space: Space
  initSearchFiles: FileAndSender[]
  initFiles: FileAndSender[]
  initFolders: FolderAndSender[]
  initPath: Path
}

export default function Postbox(props: PostboxProps) {
  return (
    <div className="flex w-full flex-col">
      <FilesProvider {...props} postbox={true}>
        <FilesDashboardHeader />
        <div className="flex flex-grow overflow-y-auto">
          <FilesSidebarWrap />
          <FilesDashboard />
        </div>
      </FilesProvider>
    </div>
  )
}
