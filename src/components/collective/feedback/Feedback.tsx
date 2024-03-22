import FilesProvider from '@/components/files/FilesProvider'
import FilesDashboard from '@/components/files/dashboard/FilesDashboard'
import FilesDashboardHeader from '@/components/files/dashboard/FilesDashboardHeader'
import FilesSidebarWrap from '@/components/files/sidebar/FilesSidebarWrap'

interface FeedbackProps {
  space: Space
  initSearchFiles: FileAndSender[]
  initFiles: FileAndSender[]
  initFolders: FolderAndSender[]
  initPath: Path
}

export default function Feedback(props: FeedbackProps) {
  return (
    <div className="flex w-full flex-col">
      <FilesProvider {...props} feedback={true}>
        <FilesDashboardHeader />
        {
          <div className="flex flex-grow overflow-y-auto">
            <FilesSidebarWrap />
            {<FilesDashboard />}
          </div>
        }
        <div></div>
      </FilesProvider>
    </div>
  )
}
