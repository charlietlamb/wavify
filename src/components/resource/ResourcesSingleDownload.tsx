import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import SeparatorText from '../util/SeparatorText'
import { useResourceContext } from './context/resourceContext'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFileFromId } from '../dashboard/resources/manage/functions/getFileFromId'
import { download } from '../chat/functions/download'
import { downloadFolder } from '../files/functions/downloadFolder'
import ButtonLoaderIcon from '../utils/ButtonLoaderIcon'
import { getFolder } from '../files/functions/getFolders/getFolder'

export default function ResourcesSingleDownload() {
  const { resource } = useResourceContext()
  const supabase = createClientComponentClient()
  const [files, setFiles] = useState<FileData[]>([])
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)
  useEffect(() => {
    async function getFiles() {
      let toSetFiles: FileData[] = []
      for (const file of resource.fileIds) {
        const fileData = await getFileFromId(supabase, file)
        if (fileData) toSetFiles.push(fileData)
      }
      setFiles(toSetFiles)
    }
    getFiles()
  }, [])
  return (
    <div className="flex flex-grow flex-col gap-2">
      <ButtonLoaderIcon
        className="flex gap-2"
        variant="zinc"
        onClick={async () => {
          setDownloadLoading(true)
          const folder = await getFolder(supabase, resource.folder)
          downloadFolder(folder, undefined, supabase, setDownloadLoading)
        }}
        isLoading={downloadLoading}
        icon={
          <>
            <Download className="min-h-6 min-w-6" />
            Download
          </>
        }
      />

      <SeparatorText text="OR" />
      {files.map((file) => (
        <Button
          className="flex justify-start gap-2"
          variant="zinc_outline"
          onClick={() => download(file.url, file.name)}
          key={file.id}
        >
          <Download className="min-h-6 min-w-6" />
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {file.name}
          </span>
        </Button>
      ))}
    </div>
  )
}
