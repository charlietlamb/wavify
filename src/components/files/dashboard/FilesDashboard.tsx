import FilesToggle from '../sidebar/FilesToggle'
import FilesFiles from './FilesFiles'
import FilesFilters from './FilesFilters'

export default function FilesDashboard() {
  return (
    <div className="relative flex w-full flex-col gap-y-4 p-4">
      <FilesToggle />
      <FilesFilters />
      <FilesFiles />
    </div>
  )
}
