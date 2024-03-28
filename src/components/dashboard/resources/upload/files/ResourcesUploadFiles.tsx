import { Input } from '@/components/ui/input'
import { ActionTooltip } from '@/components/util/ActionTooltip'
import { cn } from '@/lib/utils'
import { Ban, Play, Upload, X } from 'lucide-react'
import FileInfoDialog from './FileInfoDialog'
import { useUploadContext } from '../context/context'
import { Checkbox } from '@nextui-org/react'
import { toast } from 'sonner'
import { musicExtensions } from '@/components/chat/data/extensions'

export type FileUploadData = {
  file: File
  name: string
  preview: boolean
}

export default function ResourcesUploadFiles() {
  const { files, setFiles } = useUploadContext()
  function onSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files
    if (!fileList) return
    const fileArray = [...fileList]
    const filesMap = fileArray.map((file) => ({
      file,
      name: file.name,
      preview: false,
    }))
    setFiles([...files, ...filesMap])
  }

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>,
    file: FileUploadData,
    files: FileUploadData[],
    setFiles: React.Dispatch<React.SetStateAction<FileUploadData[]>>
  ) {
    const newFile = { ...file, name: e.target.value }
    const newFiles = files.map((f) => (f.file === file.file ? newFile : f))
    setFiles(newFiles)
  }

  function handleCheckboxClick(file: FileUploadData) {
    if (
      file.file.type.includes('audio') ||
      musicExtensions.includes(file.file.name.split('.').pop() || '')
    ) {
      const newFile = { ...file, preview: !file.preview }
      const newFiles = files.map((f) =>
        f.file === file.file ? newFile : { ...f, preview: false }
      )
      setFiles(newFiles)
      if (newFile.preview) {
        toast('Resource preview set.', {
          description: `${newFile.name} selected.`,
          icon: <Play />,
        })
      } else {
        toast('Resource preview removed.', {
          description: `${newFile.name} removed.`,
          icon: <Ban />,
        })
      }
    }
  }

  return (
    <div
      className={cn(
        'min-h-auto flex h-auto w-full flex-col lg:h-full lg:min-h-full lg:w-[300px] lg:min-w-[300px] lg:overflow-y-auto lg:p-4',
        !!files.length && 'gap-4'
      )}
    >
      <div
        className={cn(
          'group relative flex h-[120px] w-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-lg border-2 border-dashed border-zinc-700 p-4 hover:border-zinc-200 lg:h-[200px]'
        )}
      >
        <p className="text-lg font-semibold">Upload Resource Files</p>
        <Upload className="h-8 w-8" />
        <p className="text-zinc-400">Max File Size: 1MB</p>
        <input
          type="file"
          onChange={onSelectFile}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          multiple
        />
      </div>
      <div className="flex h-fit flex-grow flex-col gap-y-4 lg:h-auto lg:overflow-y-auto">
        {files.map((file: FileUploadData, index: number) => (
          <div
            key={file.file.lastModified}
            className="flex items-center gap-x-2"
          >
            <FileInfoDialog
              file={file.file}
              name={file.name}
              textTrigger={`${index + 1}`}
            />
            <Input
              className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
              placeholder={file.file.name}
              type="text"
              value={file.name}
              onChange={(e) => {
                handleNameChange(e, file, files, setFiles)
              }}
            />
            {file.file.type.includes('audio') ||
              (musicExtensions.includes(
                file.file.name.split('.').pop() || ''
              ) && (
                <Checkbox
                  icon={<Play />}
                  isSelected={file.preview}
                  onValueChange={() => handleCheckboxClick(file)}
                />
              ))}
            <button
              className="text-zinc-700 transition hover:text-zinc-200"
              onClick={() => setFiles(files.filter((_, i) => i !== index))}
            >
              <ActionTooltip label="Remove file">
                <X />
              </ActionTooltip>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
