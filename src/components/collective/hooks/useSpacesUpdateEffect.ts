import { useEffect } from 'react'
import { getColUserDataFromId } from '../(sidebar)/(functions)/getColUserDataFromId'
import { getSpace } from '@/app/collective/[unique]/[space_slug]/(functions)/getSpace'

export function useSpacesUpdateEffect(
  supabase: Supabase,
  userRole: Role,
  spaces: Space[],
  setSpaces: React.Dispatch<React.SetStateAction<Space[]>>,
  collective: Collective,
  isFounder: boolean
) {
  useEffect(() => {
    if (!collective) return
    const channel = supabase
      .channel('spaces_' + collective.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'spaces',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            collective.id === newPayload.collective &&
            payload.eventType !== 'DELETE'
          ) {
            const newSpace = await getSpace(
              collective,
              newPayload.slug,
              supabase
            )
            if (!newSpace) return
            const newSpaces = [
              ...spaces?.filter(
                (s) => s.id !== newPayload.id // Add your condition here
              ),
              newSpace,
            ].filter(
              (space) =>
                isFounder || space.allowed.includes(userRole.id) || space.open
            )
            setSpaces(newSpaces)
          } else {
            if (payload.eventType === 'DELETE') {
              const deletedId = payload.old.id
              if (
                Array.isArray(spaces) &&
                spaces?.some((space) => space.id === deletedId)
              ) {
                setSpaces(spaces?.filter((space) => space.id !== deletedId))
              }
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
