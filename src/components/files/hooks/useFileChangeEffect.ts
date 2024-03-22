import { useEffect } from 'react'
import { Filters, SortingType } from '../data/data'
import { musicExtensions } from '@/components/chat/data/extensions'
import { getUserTopFiles } from '../functions/getUserTopFiles'
import { sortFiles } from '../functions/sortFiles'
import { getFilesFromParent } from '../functions/getFilesFromParent'
import { getUserFromId } from '../functions/getUserFromId'
import { getUserFeedbackFiles } from '@/components/collective/feedback/functions/getUserFeedbackFiles'
import { fileFunctionMap } from '../data/fileFunctionMap'
import { fileFilterSort } from '../functions/fileFilterSort'

export async function useFileChangeEffect(
  supabase: Supabase,
  user: User,
  files: FileAndSender[],
  setFiles: React.Dispatch<React.SetStateAction<FileAndSender[]>>,
  filters: Filters,
  sorting: SortingType,
  fileStore: React.MutableRefObject<FileAndSender[]>,
  space: Space | undefined,
  feedbackFiles: FileAndSender[],
  path: Path[],
  schedule: Schedule | undefined
) {
  useEffect(() => {
    setFiles(fileFilterSort(files, filters, sorting))
  }, [filters.music, sorting])

  useEffect(() => {
    const currentType = path[path.length - 1].type
    async function updateFiles() {
      const func = fileFunctionMap.get(currentType)
      if (!func) return
      setFiles(fileFilterSort(await func(path, schedule), filters, sorting))
    }
    updateFiles()
  }, [supabase, user, path, fileStore.current, feedbackFiles])
}
