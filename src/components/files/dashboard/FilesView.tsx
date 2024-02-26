import { LayoutGrid, StretchHorizontal } from 'lucide-react'
import { useFilesContext } from '../state/context'
import { ActionTooltip } from '@/components/util/ActionTooltip'

export default function FilesView() {
  const { view, setView } = useFilesContext()
  return (
    <ActionTooltip
      label={view === 'grid' ? 'Change to Column View' : 'Change to Grid View'}
    >
      <button
        onClick={() => setView(view === 'grid' ? 'column' : 'grid')}
        className="flex h-8 w-8 items-center justify-center rounded-md p-1 transition-all hover:bg-zinc-800"
      >
        {view === 'grid' ? <StretchHorizontal /> : <LayoutGrid />}
      </button>
    </ActionTooltip>
  )
}
