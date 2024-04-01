import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useUploadContext } from '../upload/context/context'
import { Pencil } from 'lucide-react'
import { iconClassName } from '@/components/nav/MenuBar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch, SetStateAction } from 'react'
import { SetState } from 'zustand'
import { handleEdit } from './functions/handleEdit'

export default function ResourceEllipsisComponent({
  resource,
  setLoadingId,
}: {
  resource: Resource
  setLoadingId: Dispatch<SetStateAction<string>>
}) {
  const supabase = createClientComponentClient()
  const uploadContext = useUploadContext()

  return (
    <div className="flex flex-col">
      <div
        onClick={() =>
          handleEdit(resource, uploadContext, setLoadingId, supabase)
        }
        className="relative flex cursor-pointer select-none items-center rounded-sm px-4 py-2 text-sm font-semibold outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      >
        Edit Resource
        <Pencil className={iconClassName} />
      </div>
    </div>
  )
}
