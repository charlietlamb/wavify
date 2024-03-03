import { useEffect } from 'react'
import { getFolder } from '../functions/getFolder'
import { getUserFromId } from '../functions/getUserFromId'

export function usePathChangeEffect(
  supabase: Supabase,
  parent: string | null,
  setPath: React.Dispatch<React.SetStateAction<Path[]>>,
  space: Space | undefined,
  postbox: boolean,
  postboxFolders: FolderAndSender[],
  postboxReceive: boolean
) {
  useEffect(() => {
    const updatePath = async () => {
      if (!parent) {
        setPath([])
      }
      let path = []
      let nextParent = parent
      while (nextParent) {
        if (nextParent === 'pb' || nextParent.includes('u:')) {
          if (nextParent.includes('u:')) {
            const otherUser = await getUserFromId(
              supabase,
              nextParent.split('u:')[1]
            )
            path.push({ id: nextParent, name: otherUser.username })
          }
          if (postboxReceive) path.push({ id: 'pb', name: space?.slug })
          nextParent = null
        } else if (nextParent === 't') {
          path.push({ id: 't', name: space?.slug })
        } else {
          if (
            postbox &&
            postboxFolders.some((folder) => folder.id === nextParent)
          ) {
            const otherUserId = postboxFolders.find(
              (folder) => folder.id === nextParent
            )?.user
            if (!otherUserId) return
            const otherUser = await getUserFromId(supabase, otherUserId)
            const parentFolder = await getFolder(supabase, nextParent)
            path.push({ id: parentFolder.id, name: parentFolder.name })
            path.push({ id: 'u:' + otherUser.id, name: otherUser.username })
            if (postboxReceive) path.push({ id: 'pb', name: space?.slug })
            nextParent = null
          } else {
            const parentFolder = await getFolder(supabase, nextParent)
            path.push({ id: parentFolder.id, name: parentFolder.name })
            nextParent = parentFolder.parent
          }
        }
      }
      setPath(path)
    }
    updatePath()
  }, [supabase, parent, setPath])
}
