import ButtonLoader from '@/components/utils/ButtonLoader'
import { useState } from 'react'
import { useResourceUploadContext } from './context/context'
import submitResource from './functions/submitResource'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ResourcesUploadSubmit({
  className,
}: {
  className: string
}) {
  const supabase = createClientComponentClient()
  const context = useResourceUploadContext()
  const user = useUser()
  return (
    <ButtonLoader
      variant="zinc"
      onClick={() => submitResource(supabase, user, context)}
      isLoading={context.loading}
      text="Submit"
      className={className}
    />
  )
}
