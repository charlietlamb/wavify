import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getCollective } from '@/app/collective/[unique]/[space_slug]/(functions)/getCollective'

export function useCollectiveDispatchEffect(
  supabase: Supabase,
  collective: Collective,
  setCollective: (collective: Collective | 'DELETED') => void
) {
  useEffect(() => {
    const channel = supabase
      .channel('spaces_' + uuidv4())
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'collective',
        },
        async (payload) => {
          if (collective) {
            if (payload.eventType !== 'DELETE') {
              if (payload.new.collective === collective.id) {
                const newCollective = await getCollective(
                  supabase,
                  collective.unique
                )
                if (newCollective) setCollective(newCollective)
              }
            } else {
              setCollective('DELETED')
            }
          }
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, collective])
}
