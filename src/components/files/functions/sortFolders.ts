import { SortingType } from '../data/data'

export function sortFolders(
  folders: FolderAndSender[],
  sorting: SortingType
): FolderAndSender[] {
  switch (sorting) {
    case 'alphabetical':
      return folders.sort((a, b) => a.name.localeCompare(b.name))
    case 'date':
      return folders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'size':
      return folders.sort((a, b) => b.size - a.size)
    default:
      return folders
  }
}
