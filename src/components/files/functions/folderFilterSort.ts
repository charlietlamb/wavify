import { Filters, SortingType } from '../data/data'
import { sortFolders } from './sortFolders'

export function folderFilterSort(
  folders: FolderAndSender[],
  filters: Filters,
  sorting: SortingType
) {
  const filteredFolders = folders.filter((folder) => {
    if (filters.music) {
      return folder.music
    }
    return true
  })
  return sortFolders(filteredFolders, sorting) as FolderAndSender[]
}
