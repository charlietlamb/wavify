import { useEffect } from 'react'
import { Filters, SortingType } from '../data/data'
import { musicExtensions } from '@/components/chat/data/extensions'
import { getUserFilesFromParent } from '../functions/getUserFilesFromParent'
import { getUserTopFiles } from '../functions/getUserTopFiles'
import { sortFiles } from '../functions/sortFiles'

export async function useFileChangeEffect(
  supabase: Supabase,
  user: User,
  changeFiles: FileAndSender[],
  setFiles: React.Dispatch<React.SetStateAction<FileAndSender[]>>,
  filters: Filters,
  sorting: SortingType,
  parent: string | null,
  parentStore: React.MutableRefObject<string | null>
) {
  useEffect(() => {
    const setFilesAsync = async (parent: string | null) => {
      setFiles(
        parent
          ? await getUserFilesFromParent(supabase, user, parent)
          : await getUserTopFiles(supabase, user)
      )
    }

    if (parentStore.current !== parent) {
      parentStore.current = parent
      setFilesAsync(parent)
    }
    const filteredFiles = changeFiles.filter((file) => {
      if (filters.music) {
        return musicExtensions.includes(file.name.split('.').pop() || '')
      }
      return true
    })
    const sortedFiles = sortFiles(filteredFiles, sorting)
    setFiles(sortedFiles)
  }, [changeFiles, filters.music, sorting, parent])
}
