import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Cog } from 'lucide-react'
import { useState } from 'react'
import ResourcesMoreDelete from './more/ResourcesMoreDelete'
import ResourcesMoreDraft from './more/ResourcesMoreDraft'

export default function ResourcesUploadMore() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex w-full flex-grow cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200"
        onClick={() => setOpen(true)}
      >
        <p className="text-lg font-bold text-zinc-200">More Resource Options</p>
        <Cog className="h-8 w-8 text-zinc-400" />
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Resource Options</h3>
          <p className="text-zinc-400">
            How would you like to edit your resource?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ResourcesMoreDraft setOpen={setOpen} />
          <ResourcesMoreDelete setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
