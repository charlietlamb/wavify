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
  postboxReceive: boolean,
  transient: boolean,
  transientFolders: FolderAndSender[],
  feedback: boolean,
  feedbackFolders: FolderAndSender[],
  feedbackGive: boolean
) {
  useEffect(() => {
    const updatePath = async () => {
      if (!parent && (!postbox || !transient || !feedback)) {
        setPath([])
      }
      let path = []
      let nextParent = parent
      console.log(nextParent)
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
        } else if (nextParent === 'f' || nextParent.includes('fd:')) {
          if (nextParent.includes('fd:')) {
            console.log('TRYING HERE')
            const otherUser = await getUserFromId(
              supabase,
              nextParent.split('fd:')[1]
            )
            path.push({ id: nextParent, name: otherUser.username })
          }
          if (feedbackGive) path.push({ id: 'f', name: space?.slug })
          nextParent = null
        } else if (nextParent === 't') {
          path.push({ id: 't', name: space?.slug })
          nextParent = null
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
            console.log('TRYING HERE')
            path.push({ id: parentFolder.id, name: parentFolder.name })
            path.push({ id: 'u:' + otherUser.id, name: otherUser.username })
            if (postboxReceive) path.push({ id: 'pb', name: space?.slug })
            nextParent = null
          } else if (
            feedback &&
            feedbackFolders.some((folder) => folder.id === nextParent)
          ) {
            const otherUserId = feedbackFolders.find(
              (folder) => folder.id === nextParent
            )?.user
            if (!otherUserId) return
            const otherUser = await getUserFromId(supabase, otherUserId)
            const parentFolder = await getFolder(supabase, nextParent)
            path.push({ id: parentFolder.id, name: parentFolder.name })
            path.push({ id: 'fd:' + otherUser.id, name: otherUser.username })
            if (feedbackGive) path.push({ id: 'f', name: space?.slug })
            nextParent = null
          } else if (
            transient &&
            transientFolders.some((folder) => folder.id === nextParent)
          ) {
            if (!space) return
            const parentFolder = await getFolder(supabase, nextParent)
            path.push({ id: parentFolder.id, name: parentFolder.name })
            path.push({ id: 't', name: space.slug })
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
