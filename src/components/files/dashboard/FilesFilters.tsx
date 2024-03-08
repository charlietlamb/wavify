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
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full gap-x-2 text-zinc-200">
        <FilesSorting />
        <FilesFilter
          text="Filter By Music"
          icon={<Speaker />}
          on={filterByMusic}
          setOn={setFilterByMusic}
        />
        {transientPost && <ScheduleSelect />}
      </div>
      <div className="ml-2 flex">
        <FilesView />
      </div>
    </div>
  )
}
