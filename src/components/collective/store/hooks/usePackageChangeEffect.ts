import { useEffect } from 'react'

export function usePackageChangeEffect(
  supabase: Supabase,
  space: Space,
  packages: PackageData[],
  refetch: () => void
) {
  useEffect(() => {
    const channel = supabase
      .channel('packages' + space.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'packages',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType !== 'DELETE' &&
            newPayload.space === space.id
          ) {
            refetch()
          } else if (
            packages.some((p) => 'id' in payload.old && p.id === payload.old.id)
          )
            refetch()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [space])
}
