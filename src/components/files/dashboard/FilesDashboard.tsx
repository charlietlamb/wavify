'use client'

import FilesToggle from '../sidebar/FilesToggle'
import { useFilesContext } from '../state/context'
import FilesFiles from './FilesFiles'
import FilesFilters from './FilesFilters'

export default function FilesDashboard() {
  const { space } = useFilesContext()
  return (
    <div className="relative flex w-full flex-col gap-y-4 p-4">
      {!space && <FilesToggle />}
      <FilesFilters />
      <FilesFiles />
    </div>
  )
}
