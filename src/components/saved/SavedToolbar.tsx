import { Bookmark } from 'lucide-react'
import SavedSorting from './SavedSorting'
import SavedTypes from './SavedTypes'
import { cn } from '@/lib/utils'
import ToolbarHeading from '../toolbar/ToolbarHeading'

export default function SavedToolbar({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        'hidden flex-col divide-y divide-zinc-700 lg:flex lg:w-[20%]',
        mobile && 'flex w-full'
      )}
    >
      <ToolbarHeading
        title="Saved"
        text="Browse all saved items"
        icon={
          <Bookmark className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
        }
      />
      <div className="flex w-full flex-col gap-2 overflow-y-auto p-4">
        <SavedTypes />
        <SavedSorting />
      </div>
    </div>
  )
}
