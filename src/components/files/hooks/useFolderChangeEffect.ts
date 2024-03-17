import { useEffect } from 'react'
import { Filters, SortingType } from '../data/data'
import { sortFolders } from '../functions/sortFolders'
import {
  folderFunctionMap,
  folderFunctionMapQuick,
} from '../data/folderFunctionMap'
import { folderFilterSort } from '../functions/folderFilterSort'

export async function useFolderChangeEffect(
  supabase: Supabase,
  user: User,
  folders: FolderAndSender[],
  setFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  filters: Filters,
  sorting: SortingType,
  folderStore: React.MutableRefObject<FolderAndSender[]>,
  space: Space | undefined,
  postbox: boolean,
  postboxFolders: FolderAndSender[],
  postboxLastFetched: string,
  transient: boolean,
  transientFolders: FolderAndSender[],
  schedule: Schedule | undefined,
  feedback: boolean,
  feedbackFolders: FolderAndSender[],
  path: Path[]
) {
  useEffect(() => {
    // const p = space && !parent ? space.folder : parent
    async function updateFoldersSorting() {
      // let folders = folderStore.current.filter((folder) => folder.parent === p)
      const filteredFolders = folders.filter((folder) => {
        if (filters.music) {
          return folder.music
        }
        return true
      })
      const sortedFolders = sortFolders(filteredFolders, sorting)
      setFolders(sortedFolders)
    }
    updateFoldersSorting()
  }, [filters.music, sorting])

  useEffect(() => {
    async function updateFolders() {
      const type = path[path.length - 1].type
      const func = folderFunctionMap.get(type)
      const qFunc = folderFunctionMapQuick.get(type)
      if (func && qFunc) {
        setFolders(folderFilterSort(await qFunc(), filters, sorting))
        setFolders(folderFilterSort(await func(), filters, sorting))
      }
    }
    updateFolders()
  }, [
    parent,
    user,
    supabase,
    folders,
    postbox,
    postboxFolders,
    postboxLastFetched,
    transientFolders,
    schedule,
    space,
    feedbackFolders,
    path,
  ])
}
