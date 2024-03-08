import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FileArchive,
  FileImage,
  FileMusic,
  Folder,
  Search,
  File as FileIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { useFilesContext } from '@/components/files/state/context'
import { submitForFeedbackFolder } from './functions/submitForFeedbackFolder'
import { submitForFeedbackFile } from './functions/submitForFeedbackFile'
import { getUserFolders } from '@/components/files/postbox/functions/getUserFolders'
import { setUserFiles } from '@/components/files/functions/setUserFiles'
import {
  imageExtensions,
  musicExtensions,
  zipExtensions,
} from '@/components/chat/data/extensions'

export default function FeedbackGet() {
  const [open, setOpen] = useState(false)
  const user = useUser()
  const supabase = createClientComponentClient()
  const { space } = useFilesContext()
  const [files, setFiles] = useState<FileAndSender[]>([])
  const [folders, setFolders] = useState<FolderAndSender[]>([])
  const fileClasses = 'min-h-6 min-w-6'
  useEffect(() => {
    async function getData() {
      if (space) {
        setUserFiles(supabase, user, setFiles)
        getUserFolders(supabase, user, setFolders)
      }
    }
    getData()
  }, [open])
  if (!space) return

  return (
    <>
      <Button
        variant={'outline'}
        className="w-full justify-start text-left font-normal"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <p>Get Feedback On...</p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all folders in library" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {folders.map(({ id, name }) => {
            return (
              <CommandItem
                key={id}
                onSelect={() => {
                  submitForFeedbackFolder(supabase, user, space, id)
                  setOpen(false)
                }}
                className="m1 cursor-pointer gap-x-2 hover:bg-background_content"
              >
                <Folder className="min-h-6 min-w-6"></Folder>
                <span>{name}</span>
                <span className="hidden">{id}</span>
              </CommandItem>
            )
          })}
          {files.map(({ id, name }) => {
            const fileExtension = name.split('.').pop()!
            return (
              <CommandItem
                key={id}
                onSelect={() => {
                  submitForFeedbackFile(supabase, user, space, id)
                  setOpen(false)
                }}
                className="m1 cursor-pointer gap-x-2 hover:bg-background_content"
              >
                {imageExtensions.includes(fileExtension) ? (
                  <FileImage className={fileClasses} />
                ) : musicExtensions.includes(fileExtension) ? (
                  <FileMusic className={fileClasses} />
                ) : zipExtensions.includes(fileExtension) ? (
                  <FileArchive className={fileClasses} />
                ) : (
                  <FileIcon className={fileClasses} />
                )}
                <span>{name}</span>
                <span className="hidden">{id}</span>
              </CommandItem>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
