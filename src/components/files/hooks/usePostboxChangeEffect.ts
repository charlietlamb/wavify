import { getPostboxTopFolders } from '@/components/collective/postbox/functions/getPostboxTopFolders'
import { useEffect } from 'react'
import { getFoldersPostboxUsers } from '../functions/getFolders/getFoldersPostboxUsers'

export function usePostboxChangeEffect(
  supabase: Supabase,
  postbox: boolean,
  setPostboxFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  space: Space | undefined,
  path: Path[]
) {
  useEffect(() => {
    const lastPath = path[path.length - 1]
    const updatePostbox = async () => {
      if (space && postbox && lastPath.type === 'postbox/user') {
        setPostboxFolders(await getFoldersPostboxUsers(path))
      }
    }

    updatePostbox()
  }, [supabase, parent, postbox, setPostboxFolders, path])
}
