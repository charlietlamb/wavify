import { useEffect } from 'react'
import { getFoldersTransient } from '@/components/files/functions/getFolders/getFoldersTransient'

export function useTransientChangeEffect(
  supabase: Supabase,
  transient: boolean,
  setTransientFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  space: Space | undefined,
  path: Path[],
  schedule: Schedule | undefined
) {
  useEffect(() => {
    const updateTransient = async () => {
      if (space && transient) {
        setTransientFolders(await getFoldersTransient(path, schedule))
      }
    }

    updateTransient()
  }, [supabase, path, transient, setTransientFolders, space, schedule])
}
