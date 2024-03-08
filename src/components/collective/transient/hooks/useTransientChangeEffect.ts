import { useEffect } from 'react'
import { getTransientFolders } from '../functions/getTransientFolders'

export function useTransientChangeEffect(
  supabase: Supabase,
  transient: boolean,
  setTransientFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  space: Space | undefined,
  parent: string | null,
  schedule: Schedule | undefined
) {
  useEffect(() => {
    const updateTransient = async () => {
      if (space && transient) {
        setTransientFolders(
          await getTransientFolders(supabase, space, schedule)
        )
      }
    }

    updateTransient()
  }, [supabase, parent, transient, setTransientFolders, space, schedule])
}
