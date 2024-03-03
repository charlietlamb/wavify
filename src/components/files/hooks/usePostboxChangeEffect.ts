import { getPostboxTopFolders } from '@/components/collective/postbox/functions/getPostboxTopFolders'
import { useEffect } from 'react'

export function usePostboxChangeEffect(
  supabase: Supabase,
  postbox: boolean,
  setPostboxFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  space: Space | undefined,
  parent: string | null
) {
  useEffect(() => {
    const updatePostbox = async () => {
      if (space && postbox && parent?.includes('u:')) {
        setPostboxFolders(
          await getPostboxTopFolders(supabase, space, parent.split(':')[1])
        )
      }
    }

    updatePostbox()
  }, [supabase, parent, postbox, setPostboxFolders, space])
}
