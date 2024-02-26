import { useEffect } from 'react'
import { Filters, SortingType } from '../data/data'
import { musicExtensions } from '@/components/chat/data/extensions'
import { sortFolders } from '../functions/sortFolders'
import { getUserFoldersFromParent } from '../functions/getUserFoldersFromParent'
import { getUserTopFolders } from '../functions/getUserTopFolders'

export async function useFolderChangeEffect(
  supabase: Supabase,
  user: User,
  changeFolders: FolderAndSender[],
  setFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  filters: Filters,
  sorting: SortingType,
  parent: string | null,
  parentStore: React.MutableRefObject<string | null>
) {
  useEffect(() => {
    const setFoldersAsync = async (parent: string | null) => {
      setFolders(
        parent
          ? await getUserFoldersFromParent(supabase, user, parent)
          : await getUserTopFolders(supabase, user)
      )
    }

    if (parentStore.current !== parent) {
      //parentStore.current = parent //This is done in useFilesChangeEffect
      setFoldersAsync(parent)
    }
    const filteredFolders = changeFolders.filter((folder) => {
      if (filters.music) {
        return musicExtensions.includes(folder.name.split('.').pop() || '')
      }
      return true
    })
    const sortedFolders = sortFolders(filteredFolders, sorting)
    setFolders(sortedFolders)
  }, [changeFolders, filters.music, sorting, parent])
}
