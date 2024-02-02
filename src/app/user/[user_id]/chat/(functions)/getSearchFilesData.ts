import { SupabaseClient } from "@supabase/supabase-js";

export async function getSearchFilesData(
  supabase: SupabaseClient<any, "public", any>,
  messageIds: string[]
) {
  const { data: searchFilesData, error: searchFilesError } = await supabase
    .from("messages")
    .select(
      `
      *,
      users ( username, profile_pic_url)
    `
    )
    .not("files", "is", null)
    .in("id", messageIds);
  return searchFilesData as (MessageAndAuthor | null)[] | undefined;
}
