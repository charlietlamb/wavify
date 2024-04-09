'use client'

import { Speaker } from 'lucide-react'
import { useFilesContext } from '../state/context'
import FilesFilter from './FilesFilter'
import FilesSorting from './FilesSorting'
import FilesView from './FilesView'
import ScheduleSelect from '@/components/collective/transient/ScheduleSelect'

export default function FilesFilters() {
  const { filterByMusic, setFilterByMusic, transientPost } = useFilesContext()
  return (
    <div className="flex w-full items-center justify-between divide-x divide-zinc-700">
      <div className="flex divide-x divide-zinc-700 text-zinc-200">
        <FilesSorting />
        <FilesFilter
          text="Filter By Music"
          icon={<Speaker />}
          on={filterByMusic}
          setOn={setFilterByMusic}
        />
        {transientPost && <ScheduleSelect />}
      </div>
      <div className="flex flex-grow justify-end">
        <FilesView />
      </div>
    </div>
  )
}
