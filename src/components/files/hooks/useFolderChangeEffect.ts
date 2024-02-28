import { useEffect } from 'react'
import { Filters, SortingType } from '../data/data'
import { sortFolders } from '../functions/sortFolders'
import { getUserTopFolders } from '../functions/getUserTopFolders'
import { getUserTopFoldersQuick } from '../functions/getUserTopFoldersQuick'
import { getFoldersFromParentQuick } from '../functions/getFoldersFromParentQuick'
import { getFoldersFromParent } from '../functions/getFoldersFromParent'

export async function useFolderChangeEffect(
  supabase: Supabase,
  user: User,
  folders: FolderAndSender[],
  setFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  filters: Filters,
  sorting: SortingType,
  parent: string | null,
  parentStore: React.MutableRefObject<string | null>,
  folderStore: React.MutableRefObject<FolderAndSender[]>,
  space: Space | undefined
) {
  useEffect(() => {
    const p = space && !parent ? space.folder : parent

    async function updateFoldersSorting() {
      let folders = folderStore.current.filter((folder) => folder.parent === p)
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
    const p = space && !parent ? space.folder : parent

    async function updateFolders() {
      if (parentStore.current !== parent) {
        //parentStore.current = parent //This is done in useFilesChangeEffect
        folderStore.current = parent
          ? await getFoldersFromParentQuick(supabase, parent)
          : space && space.folder
            ? await getFoldersFromParentQuick(supabase, space.folder)
            : await getUserTopFoldersQuick(supabase, user)

        const filteredFolders = folderStore.current.filter((folder) => {
          if (filters.music) {
            return folder.music
          }
          return true
        })
        const sortedFolders = sortFolders(filteredFolders, sorting)
        setFolders(sortedFolders)
        folderStore.current = parent
          ? await getFoldersFromParent(supabase, parent)
          : space && space.folder
            ? await getFoldersFromParent(supabase, space.folder)
            : await getUserTopFolders(supabase, user)
      } else {
        folderStore.current = folders
      }
      let foldersFilter = folderStore.current.filter(
        (folder) => folder.parent === p
      )
      const filteredFolders = foldersFilter.filter((folder) => {
        if (filters.music) {
          return folder.music
        }
        return true
      })
      const sortedFolders = sortFolders(filteredFolders, sorting)
      setFolders(sortedFolders)
    }
    updateFolders()
  }, [parent, user, supabase, folders])
}
