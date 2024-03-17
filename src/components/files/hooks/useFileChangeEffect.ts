import { useEffect } from 'react'
import { Filters, SortingType } from '../data/data'
import { musicExtensions } from '@/components/chat/data/extensions'
import { getUserTopFiles } from '../functions/getUserTopFiles'
import { sortFiles } from '../functions/sortFiles'
import { getFilesFromParent } from '../functions/getFilesFromParent'
import { getUserFromId } from '../functions/getUserFromId'
import { getUserFeedbackFiles } from '@/components/collective/feedback/functions/getUserFeedbackFiles'

export async function useFileChangeEffect(
  supabase: Supabase,
  user: User,
  setFiles: React.Dispatch<React.SetStateAction<FileAndSender[]>>,
  filters: Filters,
  sorting: SortingType,
  parentStore: React.MutableRefObject<string | null>,
  fileStore: React.MutableRefObject<FileAndSender[]>,
  space: Space | undefined,
  feedbackFiles: FileAndSender[],
  path: Path[]
) {
  useEffect(() => {
    if (
      parent !== 'pb' &&
      !parent?.includes('u:') &&
      parent !== 't' &&
      parent !== 'f'
    ) {
      if (!parent?.includes('fd:')) {
        const p = space && !parent ? space.folder : parent
        async function updateFilesSorting() {
          const files = fileStore.current.filter((file) => file.folder === p)
          const filteredFiles = files.filter((file) => {
            if (filters.music) {
              return musicExtensions.includes(file.name.split('.').pop() || '')
            }
            return true
          })
          const sortedFiles = sortFiles(filteredFiles, sorting)
          setFiles(sortedFiles)
        }
        updateFilesSorting()
      }
    }
  }, [filters.music, sorting])

  useEffect(() => {
    const p = space && !parent ? space.folder : parent
    async function updateFiles() {
      if (
        parent !== 'pb' &&
        !parent?.includes('u:') &&
        parent !== 't' &&
        parent !== 'f'
      ) {
        if (!parent?.includes('fd:')) {
          let files: FileAndSender[] = []
          if (parentStore.current !== parent) {
            parentStore.current = parent
            fileStore.current = parent
              ? await getFilesFromParent(supabase, parent)
              : space && space.folder
                ? await getFilesFromParent(supabase, space.folder)
                : await getUserTopFiles(supabase, user)
            files = fileStore.current
          } else {
            files = fileStore.current.filter((file) => file.folder === p)
          }
          const filteredFiles = files.filter((file) => {
            if (filters.music) {
              return musicExtensions.includes(file.name.split('.').pop() || '')
            }
            return true
          })
          const sortedFiles = sortFiles(filteredFiles, sorting)
          setFiles(sortedFiles)
        } else if (space) {
          const user = await getUserFromId(supabase, parent.split(':')[1])
          const files = await getUserFeedbackFiles(supabase, user, space)
          const filteredFiles = files.filter((file) => {
            if (filters.music) {
              return musicExtensions.includes(file.name.split('.').pop() || '')
            }
            return true
          })
          const sortedFiles = sortFiles(filteredFiles, sorting)
          setFiles(sortedFiles)
        }
      }
    }
    updateFiles()
  }, [supabase, user, parent, fileStore.current, feedbackFiles])
}
