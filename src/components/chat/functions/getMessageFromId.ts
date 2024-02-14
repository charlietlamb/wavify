export async function getMessageFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*, users(username, profile_pic_url)")
    .eq("id", id);
  if (error) throw error;
  return data[0] as MessageAndAuthor;
}
