import ButtonLoader from '@/components/utils/ButtonLoader'
import { useState } from 'react'
import { useUploadContext } from './context/context'
import submitResource from './functions/submitResource'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ResourcesUploadSubmit({
  className,
}: {
  className: string
}) {
  const supabase = createClientComponentClient()
  const context = useUploadContext()
  const user = useUser()
  const router = useRouter()
  return (
    <ButtonLoader
      variant="zinc"
      onClick={async () => {
        const id = await submitResource(supabase, user, context, false)
        if (id) {
          toast('Resource publish successful.', {
            description: 'This is now available to all users.',
            icon: <Check />,
          })
          router.push(`/resource/${id}`)
        }
      }}
      isLoading={context.loading}
      text={context.id ? 'Save' : 'Submit'}
      className={className}
    />
  )
}
