export async function getSearchFilesData(supabase: Supabase) {
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
            *,
            users ( username, profile_pic_url)
        `
    )
    .not("files", "is", null)
    .order("createdAt", { ascending: false });
  if (error) throw error;
  return data ? (data as (MessageAndAuthor | null)[]) : undefined;
}
