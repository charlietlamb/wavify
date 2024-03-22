import { musicExtensions } from '@/components/chat/data/extensions'
import { Filters, SortingType } from '../data/data'
import { sortFiles } from './sortFiles'

export function fileFilterSort(
  files: FileAndSender[],
  filters: Filters,
  sorting: SortingType
) {
  const filteredFiles = files.filter((file) => {
    if (filters.music) {
      return musicExtensions.includes(file.name.split('.').pop() || '')
    }
    return true
  })
  return sortFiles(filteredFiles, sorting)
}
