import { useEffect } from 'react'
import { getFeedbackUserFolders } from '../functions/getFeedbackUserFolders'
import { getUserFeedbackFolders } from '../functions/getUserFeedbackFolders'
import { getUserFromId } from '@/components/files/functions/getUserFromId'
import { getUserFeedbackFiles } from '../functions/getUserFeedbackFiles'
import { getFeedbackUserFiles } from '../functions/getFeedbackUserFiles'

export function useFeedbackChangeEffect(
  supabase: Supabase,
  feedback: boolean,
  setFeedbackFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  setFeedbackFiles: React.Dispatch<React.SetStateAction<FileAndSender[]>>,
  space: Space | undefined,
  parent: string | null
) {
  useEffect(() => {
    const updateFeedback = async () => {
      if (space && feedback && parent?.includes('fd:')) {
        const user = await getUserFromId(supabase, parent.split(':')[1])
        setFeedbackFolders(await getUserFeedbackFolders(supabase, user, space))
        setFeedbackFiles(await getUserFeedbackFiles(supabase, user, space))
      } else if (space && feedback && parent === 'f') {
        setFeedbackFolders(await getFeedbackUserFolders(supabase, space))
        setFeedbackFiles(await getFeedbackUserFiles(supabase, space))
      }
    }

    updateFeedback()
  }, [supabase, parent, feedback, setFeedbackFolders, space])
}
