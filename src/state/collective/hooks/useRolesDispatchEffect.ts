import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import isObject from '@/lib/isObject'
import { getRoles } from '@/app/collective/[unique]/roles/(functions)/getRoles'

export function useRolesDispatchEffect(
  supabase: Supabase,
  roles: Role[],
  setRoles: (roles: Role[]) => void,
  collective: Collective
) {
  useEffect(() => {
    const channel = supabase
      .channel('roles_' + uuidv4())
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'roles',
        },
        async (payload) => {
          if (collective) {
            if (payload.eventType !== 'DELETE') {
              if (payload.new.collective === collective.id)
                setRoles(await getRoles(collective, supabase))
            } else {
              if (
                roles.some(
                  (role) => isObject(payload.old) && role.id === payload.old.id
                )
              ) {
                setRoles(
                  roles.filter(
                    (role) =>
                      isObject(payload.old) && role.id !== payload.old.id
                  )
                )
              }
            }
          }
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, collective, roles])
}
