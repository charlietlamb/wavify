import { ActionTooltip } from '@/components/util/ActionTooltip'
import { Check, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch, SetStateAction, useState } from 'react'
import { useUser } from '@/state/user/useUser'
import { toast } from 'sonner'
import ButtonLoaderIcon from '@/components/utils/ButtonLoaderIcon'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'
import submitCollection from './functions/submitCollection'

export default function CollectionsCreateDraft({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const supabase = createClientComponentClient()
  const user = useUser()
  const [loadingDraft, setLoadingDraft] = useState<boolean>(false)
  const context = useCollectionsCreateContext()
  const router = useRouter()
  return (
    <div>
      <ActionTooltip label="Save As Draft">
        <ButtonLoaderIcon
          variant="zinc_outline"
          onClick={async () => {
            setLoadingDraft(true)
            await submitCollection(supabase, user, context, true)
            setLoadingDraft(false)
            setOpen(false)
            toast('Resource saved as draft', {
              description: 'You can find it in your drafts at any time.',
              icon: <Check />,
            })
            router.push('/dashboard/resources/manage')
          }}
          icon={<Save />}
          isLoading={loadingDraft}
        />
      </ActionTooltip>
    </div>
  )
}
