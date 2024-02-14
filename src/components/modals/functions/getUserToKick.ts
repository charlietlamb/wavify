export async function getUserToKick(supabase: Supabase, userId: string) {
  const { data: userToGo } = await supabase
    .from("users")
    .select()
    .eq("id", userId);

  if (Array.isArray(userToGo)) {
    return userToGo[0] as unknown as User;
  } else {
    return userToGo as unknown as User;
  }
}
