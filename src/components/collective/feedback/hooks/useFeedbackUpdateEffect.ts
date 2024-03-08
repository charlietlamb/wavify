import { Dispatch, SetStateAction, useEffect } from 'react'
import { getFeedbackUserFolders } from '../functions/getFeedbackUserFolders'
import { getFeedbackUserFiles } from '../functions/getFeedbackUserFiles'

export function useFeedbackUpdateEffect(
  supabase: Supabase,
  user: User,
  feedbackFiles: FileAndSender[],
  setFeedbackFiles: Dispatch<SetStateAction<FileAndSender[]>>,
  feedbackFolders: FolderAndSender[],
  setFeedbackFolders: Dispatch<SetStateAction<FolderAndSender[]>>,
  space: Space | undefined
) {
  useEffect(() => {
    if (!space) return
    const channel = supabase
      .channel('feedback' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feedbacks',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType !== 'DELETE' &&
            newPayload.space === space.id
          ) {
            if (newPayload.folder)
              setFeedbackFolders(await getFeedbackUserFolders(supabase, space))
            if (newPayload.file)
              setFeedbackFiles(await getFeedbackUserFiles(supabase, space))
          } else if (
            payload.eventType === 'DELETE' &&
            (feedbackFolders.some((folder) => folder.id === payload.old.id) ||
              feedbackFiles.some((file) => file.id === payload.old.id))
          ) {
            setFeedbackFolders(
              feedbackFolders.filter((folder) => folder.id !== payload.old.id)
            )
            setFeedbackFiles(
              feedbackFiles.filter((file) => file.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [
    supabase,
    user,
    feedbackFolders,
    setFeedbackFolders,
    feedbackFiles,
    setFeedbackFiles,
    space,
  ])
}
