'use client'

import { Speaker } from 'lucide-react'
import { useFilesContext } from '../state/context'
import FilesFilter from './FilesFilter'
import FilesSorting from './FilesSorting'
import FilesView from './FilesView'

export default function FilesFilters() {
  const { filterByMusic, setFilterByMusic } = useFilesContext()
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-x-2 text-zinc-200 ">
        <FilesSorting />
        <FilesFilter
          text="Filter By Music"
          icon={<Speaker />}
          on={filterByMusic}
          setOn={setFilterByMusic}
        />
      </div>
      <div className="flex">
        <FilesView />
      </div>
    </div>
  )
}
