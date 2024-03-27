export async function handleResourceCommentSend(
  supabase: Supabase,
  resource: Resource,
  user: User,
  commentInput: string,
  setCommentInput: React.Dispatch<React.SetStateAction<string>>,
  refetch: () => void
) {
  await supabase.from('comments').insert([
    {
      message: commentInput,
      resource: resource.id,
      user: user.id,
    },
  ])
  setCommentInput('')
  refetch()
}
