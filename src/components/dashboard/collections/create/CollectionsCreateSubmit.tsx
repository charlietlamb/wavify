import ButtonLoader from '@/components/utils/ButtonLoader'
import { useState } from 'react'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'
import submitCollection from './functions/submitCollection'

export default function CollectionsCreateSubmit({
  className,
}: {
  className: string
}) {
  const supabase = createClientComponentClient()
  const context = useCollectionsCreateContext()
  const user = useUser()
  const router = useRouter()
  return (
    <ButtonLoader
      variant="zinc"
      onClick={async () => {
        const id = await submitCollection(supabase, user, context, false)
        if (id) {
          toast('Collection publish successful.', {
            description: 'This is now available to all users.',
            icon: <Check />,
          })
          router.push(`/collection/${id}`)
        }
      }}
      isLoading={context.loading}
      text={context.id ? 'Save' : 'Submit'}
      className={className}
    />
  )
}
