import {
  imageExtensions,
  musicExtensions,
  zipExtensions,
} from '@/components/chat/data/extensions'
import { AnimatedCheckIcon } from '@/components/icons/check'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import isObject from '@/lib/isObject'
import {
  FileArchive,
  FileIcon,
  FileImage,
  FileMusic,
  Trash2,
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { ActionTooltip } from '../ActionTooltip'

type DisplayFile = {
  file: File
  id: string
}

export default function UploadFilesPreview({
  displayFiles,
  setDisplayFiles,
  scrollRef,
  color,
}: {
  displayFiles: DisplayFile[]
  setDisplayFiles: Dispatch<SetStateAction<DisplayFile[]>>
  scrollRef: React.RefObject<HTMLDivElement>
  color?: string
}) {
  const fileClasses = 'flex-shrink-0 w-12 h-12 text-background_content'
  const onAction = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setDisplayFiles(
      Array.isArray(displayFiles)
        ? displayFiles.filter((file) => file.id !== id)
        : []
    )
  }
  return (
    <ScrollArea
      className="mt-2 max-h-[40vh] max-w-full overflow-y-auto"
      ref={scrollRef}
    >
      {displayFiles.length > 0 &&
        displayFiles.map((file, index) => {
          const fileExt = file.file.name.split('.').pop()
          return (
            <Card
              key={index}
              className="mt-2 flex items-center rounded-lg border-2 bg-transparent transition-all hover:rounded-md hover:bg-white/5"
              style={{ borderColor: color ? color : '#E4E4E7' }}
            >
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex items-center space-x-3 p-4">
                  {/* {isObject(file) &&
                  typeof fileExt === 'string' &&
                  imageExtensions.includes(fileExt) ? (
                    <FileImage
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : '#E4E4E7' }}
                    />
                  ) : typeof fileExt === 'string' &&
                    musicExtensions.includes(fileExt) ? (
                    <FileMusic
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : '#E4E4E7' }}
                    />
                  ) : typeof fileExt === 'string' &&
                    zipExtensions.includes(fileExt) ? (
                    <FileArchive
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : '#E4E4E7' }}
                    />
                  ) : (
                    <FileIcon
                      className={fileClasses}
                      strokeWidth={1}
                      style={{ color: color ? color : '#E4E4E7' }}
                    />
                  )}{' '} */}
                  <div
                    className="font-medium"
                    style={{ color: color ? color : '#E4E4E7' }}
                  >
                    <div className="max-w-[15vw] overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
                      {file.file.name}
                    </div>{' '}
                    <div className="text-zinc-500">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>{' '}
                  </div>
                </div>
                <div className="flex flex-row gap-x-2 pr-4">
                  <AnimatedCheckIcon
                    width={32}
                    height={32}
                    color="#E4E4E7"
                  ></AnimatedCheckIcon>
                  <ActionTooltip label="Delete">
                    <Trash2
                      onClick={(e) => onAction(e, file.id)}
                      className="h-8 w-8 flex-shrink-0 cursor-pointer"
                      color={color ? color : '#E4E4E7'}
                    />
                  </ActionTooltip>
                </div>
              </div>
            </Card>
          )
        })}
    </ScrollArea>
  )
}
