import { LayoutGrid, StretchHorizontal } from 'lucide-react'
import { useFilesContext } from '../state/context'
import { ActionTooltip } from '@/components/util/ActionTooltip'
import { Button } from '@/components/ui/button'

export default function FilesView() {
  const { view, setView } = useFilesContext()
  return (
    <ActionTooltip
      label={view === 'grid' ? 'Change to Column View' : 'Change to Grid View'}
    >
      <Button
        onClick={() => setView(view === 'grid' ? 'column' : 'grid')}
        // className="flex h-8 w-8 items-center justify-center rounded-md p-1 transition-all hover:bg-zinc-800"
        variant="zinc_icon_dark"
        size="icon"
      >
        {view === 'grid' ? <StretchHorizontal /> : <LayoutGrid />}
      </Button>
    </ActionTooltip>
  )
}
