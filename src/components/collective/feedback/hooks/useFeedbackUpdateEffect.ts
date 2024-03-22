import { Dispatch, SetStateAction, useEffect } from 'react'
import { getFoldersFeedback } from '@/components/files/functions/getFolders/getFoldersFeedback'
import { getFilesFeedback } from '@/components/files/functions/getFiles/getFilesFeedback'

export function useFeedbackUpdateEffect(
  supabase: Supabase,
  user: User,
  feedbackFiles: FileAndSender[],
  setFeedbackFiles: Dispatch<SetStateAction<FileAndSender[]>>,
  feedbackFolders: FolderAndSender[],
  setFeedbackFolders: Dispatch<SetStateAction<FolderAndSender[]>>,
  space: Space | undefined,
  path: Path[]
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
              setFeedbackFolders(await getFoldersFeedback(path))
            if (newPayload.file) setFeedbackFiles(await getFilesFeedback(path))
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
