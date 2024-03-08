import { useEffect } from 'react'

export function useCommentUpdateEffect(
  supabase: Supabase,
  user: User,
  file: FileAndSender | undefined,
  folder: FolderAndSender | undefined,
  comments: CommentAndUser[],
  refetch: () => void
) {
  useEffect(() => {
    if (!file && !folder) return
    const channel = supabase
      .channel('comments' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType !== 'DELETE' &&
            ((folder && newPayload.folder === folder.id) ||
              (file && newPayload.file === file.id))
          ) {
            refetch()
          } else if (
            payload.eventType === 'DELETE' &&
            comments.some((comment) => comment.id === payload.old.id)
          ) {
            refetch()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, file, folder, comments, refetch])
}
