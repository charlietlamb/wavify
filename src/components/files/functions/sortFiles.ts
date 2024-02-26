import { SortingType } from '../data/data'

export function sortFiles(
  files: FileAndSender[],
  sorting: SortingType
): FileAndSender[] {
  switch (sorting) {
    case 'alphabetical':
      return files.sort((a, b) => a.name.localeCompare(b.name))
    case 'date':
      return files.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'size':
      return files.sort((a, b) => b.size - a.size)
    default:
      return files
  }
}
