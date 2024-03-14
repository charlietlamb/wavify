import { useState } from 'react'
import ButtonLoader from '../utils/ButtonLoader'
import { createRole } from './roles/createRole'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCollective } from '@/state/collective/useCollective'

export default function RoleButtons() {
  const supabase = createClientComponentClient()
  const { collective, roles } = useCollective()
  const [createLoading, setCreateLoading] = useState(false)

  return (
    <div className="mt-4 flex w-full justify-end">
      <div className="flex space-x-4">
        <ButtonLoader
          onClick={() =>
            createRole(supabase, setCreateLoading, collective, roles)
          }
          isLoading={createLoading}
          text="Create Role"
        ></ButtonLoader>
      </div>
    </div>
  )
}
