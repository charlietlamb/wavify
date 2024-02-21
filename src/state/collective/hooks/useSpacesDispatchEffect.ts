import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import isObject from '@/lib/isObject'
import { getSpaces } from '@/components/collective/(sidebar)/(functions)/getSpaces'

export function useSpacesDispatchEffect(
  supabase: Supabase,
  spaces: Space[],
  setSpaces: (spaces: Space[]) => void,
  collective: Collective
) {
  useEffect(() => {
    const channel = supabase
      .channel('spaces_' + uuidv4())
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'spaces',
        },
        async (payload) => {
          if (collective) {
            if (payload.eventType !== 'DELETE') {
              if (payload.new.collective === collective.id)
                setSpaces(await getSpaces(collective, supabase))
            } else {
              if (
                spaces.some(
                  (space) =>
                    isObject(payload.old) && space.id === payload.old.id
                )
              ) {
                setSpaces(
                  spaces.filter(
                    (space) =>
                      isObject(payload.old) && space.id !== payload.old.id
                  )
                )
              }
            }
          }
          /* 
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (newPayload.collective === collective.id) {
            const newSpaces: Space[] = await getSpaces(collective, supabase)
          } else {
            if (
              spaces.some(
                (space) => isObject(payload.old) && space.id === payload.old.id
              )
            ) {
              setSpaces(
                spaces.filter(
                  (space) =>
                    isObject(payload.old) && space.id !== payload.old.id
                )
              )
            }
          }*/
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, collective, spaces])
}
