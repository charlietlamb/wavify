import { useEffect } from 'react'
import { getFoldersFeedbackUsers } from '@/components/files/functions/getFolders/getFoldersFeedbackUsers'
import { getFilesFeedback } from '@/components/files/functions/getFiles/getFilesFeedback'
import { getFoldersFeedback } from '@/components/files/functions/getFolders/getFoldersFeedback'

export function useFeedbackChangeEffect(
  supabase: Supabase,
  feedback: boolean,
  setFeedbackFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>,
  setFeedbackFiles: React.Dispatch<React.SetStateAction<FileAndSender[]>>,
  space: Space | undefined,
  path: Path[]
) {
  useEffect(() => {
    const lastPathType = path[path.length - 1].type
    const updateFeedback = async () => {
      if (space && feedback && lastPathType === 'feedback/user') {
        setFeedbackFolders(await getFoldersFeedbackUsers(path))
        setFeedbackFiles(await getFilesFeedback(path))
      } else if (space && feedback && lastPathType === 'feedback') {
        setFeedbackFolders(await getFoldersFeedback(path))
        setFeedbackFiles([])
      }
    }

    updateFeedback()
  }, [supabase, path, feedback, setFeedbackFolders, space])
}
