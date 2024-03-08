import { useEffect } from 'react'
import { Filters, SortingType } from '../data/data'
import { sortFolders } from '../functions/sortFolders'
import { getUserTopFolders } from '../functions/getUserTopFolders'
import { getUserTopFoldersQuick } from '../functions/getUserTopFoldersQuick'
import { getFoldersFromParentQuick } from '../functions/getFoldersFromParentQuick'
import { getFoldersFromParent } from '../functions/getFoldersFromParent'
import { getPostboxTopFolders } from '@/components/collective/postbox/functions/getPostboxTopFolders'
import { getPostboxUsers } from '../postbox/functions/getPostboxUsers'
import { getTransientFolders } from '@/components/collective/transient/functions/getTransientFolders'
import { getFeedbackUserFolders } from '@/components/collective/feedback/functions/getFeedbackUserFolders'
import { getUserFromId } from '../functions/getUserFromId'
import { getUserFeedbackFolders } from '@/components/collective/feedback/functions/getUserFeedbackFolders'

export async function useFolderChangeEffect(
  supabase: Supabase,
  user: User,
  folders: FolderAndSender[],
  setFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  filters: Filters,
  sorting: SortingType,
  parent: string | null,
  parentStore: React.MutableRefObject<string | null>,
  folderStore: React.MutableRefObject<FolderAndSender[]>,
  space: Space | undefined,
  postbox: boolean,
  postboxFolders: FolderAndSender[],
  postboxLastFetched: string,
  transient: boolean,
  transientFolders: FolderAndSender[],
  schedule: Schedule | undefined,
  feedback: boolean,
  feedbackFolders: FolderAndSender[]
) {
  useEffect(() => {
    const p = space && !parent ? space.folder : parent
    async function updateFoldersSorting() {
      let folders = folderStore.current.filter((folder) => folder.parent === p)
      const filteredFolders = folders.filter((folder) => {
        if (filters.music) {
          return folder.music
        }
        return true
      })
      const sortedFolders = sortFolders(filteredFolders, sorting)
      setFolders(sortedFolders)
    }
    updateFoldersSorting()
  }, [filters.music, sorting])

  useEffect(() => {
    const p = space && !parent ? space.folder : parent
    console.log(parent)
    async function updateFolders() {
      if (parentStore.current !== parent) {
        //parentStore.current = parent //This is done in useFilesChangeEffect
        if (
          space &&
          (postbox || transient || feedback) &&
          (parent?.includes('u:') ||
            parent === 'pb' ||
            parent === 't' ||
            parent === 'f' ||
            parent?.includes('fd:'))
        ) {
          if (parent === 'pb') {
            folderStore.current = await getPostboxUsers(supabase, space)
          } else if (parent === 't') {
            folderStore.current = await getTransientFolders(
              supabase,
              space,
              schedule
            )
          } else if (parent === 'f') {
            folderStore.current = await getFeedbackUserFolders(supabase, space)
          } else if (parent?.includes('fd:')) {
            const otherUser = await getUserFromId(
              supabase,
              parent.split(':')[1]
            )
            folderStore.current = await getUserFeedbackFolders(
              supabase,
              otherUser,
              space
            )
          } else {
            folderStore.current = await getPostboxTopFolders(
              supabase,
              space,
              parent.split('u:')[1]
            )
          }
        } else {
          folderStore.current = parent
            ? await getFoldersFromParentQuick(supabase, parent)
            : space && space.folder
              ? await getFoldersFromParentQuick(supabase, space.folder)
              : await getUserTopFoldersQuick(supabase, user)
        }

        const filteredFolders = folderStore.current.filter((folder) => {
          if (filters.music) {
            return folder.music
          }
          return true
        })
        const sortedFolders = sortFolders(filteredFolders, sorting)
        setFolders(sortedFolders)
        if (
          !(
            space &&
            (postbox || transient || feedback) &&
            (parent?.includes('u:') ||
              parent === 'pb' ||
              parent === 't' ||
              parent === 'f' ||
              parent?.includes('fd:'))
          )
        ) {
          folderStore.current = parent
            ? await getFoldersFromParent(supabase, parent)
            : space && space.folder
              ? await getFoldersFromParent(supabase, space.folder)
              : await getUserTopFolders(supabase, user)
        }
      } else {
        if (
          space &&
          (postbox || transient || feedback) &&
          (parent?.includes('u:') ||
            parent === 'pb' ||
            parent === 't' ||
            parent?.includes('fd:') ||
            parent === 'f')
        ) {
          if (parent === 'pb') {
            folderStore.current = await getPostboxUsers(supabase, space)
          } else if (parent === 't') {
            folderStore.current = await getTransientFolders(
              supabase,
              space,
              schedule
            )
          } else if (parent === 'f') {
            folderStore.current = await getFeedbackUserFolders(supabase, space)
          } else if (parent?.includes('fd:')) {
            const otherUser = await getUserFromId(
              supabase,
              parent.split(':')[1]
            )
            folderStore.current = await getUserFeedbackFolders(
              supabase,
              otherUser,
              space
            )
          } else {
            folderStore.current = await getPostboxTopFolders(
              supabase,
              space,
              parent.split('u:')[1]
            )
          }
        } else {
          if (!transient) {
            folderStore.current = folders
          } else if (parent) {
            folderStore.current = await getFoldersFromParentQuick(
              supabase,
              parent
            )
            const filteredFolders = folderStore.current.filter((folder) => {
              if (filters.music) {
                return folder.music
              }
              return true
            })
            const sortedFolders = sortFolders(filteredFolders, sorting)
            setFolders(sortedFolders)
            folderStore.current = await getFoldersFromParent(supabase, parent)
          }
        }
      }
      console.log(folderStore.current)
      console.log(p)
      let foldersFilter = folderStore.current.filter(
        (folder) => folder.parent === p
      )
      const filteredFolders = foldersFilter.filter((folder) => {
        if (filters.music) {
          return folder.music
        }
        return true
      })
      const sortedFolders = sortFolders(filteredFolders, sorting)
      setFolders(sortedFolders)
    }
    updateFolders()
  }, [
    parent,
    user,
    supabase,
    folders,
    postbox,
    postboxFolders,
    postboxLastFetched,
    transientFolders,
    schedule,
    space,
    feedbackFolders,
  ])
}
