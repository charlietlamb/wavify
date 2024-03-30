import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ActionTooltip } from '@/components/util/ActionTooltip'
import ButtonLoader from '@/components/utils/ButtonLoader'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch, SetStateAction, useState } from 'react'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'
import { deleteCollection } from './functions/deleteCollection'

export default function CollectionsCreateDelete({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const supabase = createClientComponentClient()
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const { id, name } = useCollectionsCreateContext()
  const router = useRouter()
  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <ActionTooltip label="Delete Resource">
        <Button variant="zinc_outline" onClick={() => setOpenDelete(true)}>
          <Trash2 />
        </Button>
      </ActionTooltip>
      <DialogContent>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Resource Options</h3>
          <p className="text-zinc-400">
            {`Are you sure? ${name} will be deleted permanently.`}
          </p>
        </div>
        <ButtonLoader
          variant="zinc"
          className="w-full"
          text="Delete"
          onClick={async () => {
            if (id) {
              await deleteCollection(
                supabase,
                id,
                setOpen,
                setOpenDelete,
                setLoadingDelete
              )
            }
            router.push('dashboard/resources/general')
          }}
          isLoading={loadingDelete}
        />
      </DialogContent>
    </Dialog>
  )
}
