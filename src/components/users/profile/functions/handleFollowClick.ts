export async function handleFollowClick(
  supabase: Supabase,
  user: User,
  otherUser: User
) {
  const isFollowing = user.following.includes(otherUser.id)
  if (isFollowing) {
    const { error } = await supabase
      .from('followers')
      .delete()
      .eq('follower', user.id)
      .eq('user', otherUser.id)
  } else {
    const { error } = await supabase.from('followers').insert([
      {
        follower: user.id,
        user: otherUser.id,
      },
    ])
  }
}
