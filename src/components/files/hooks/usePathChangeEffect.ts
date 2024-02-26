import { useEffect } from 'react'
import { getFolder } from '../functions/getFolder'

export function usePathChangeEffect(
  supabase: Supabase,
  parent: string | null,
  setPath: React.Dispatch<React.SetStateAction<Path[]>>
) {
  useEffect(() => {
    const updatePath = async () => {
      if (!parent) {
        setPath([])
      }
      let path = []
      let nextParent = parent
      while (nextParent) {
        const parentFolder = await getFolder(supabase, nextParent)
        path.push({ id: parentFolder.id, name: parentFolder.name })
        nextParent = parentFolder.parent
      }
      setPath(path)
    }
    updatePath()
  }, [supabase, parent, setPath])
}
