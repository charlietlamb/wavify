import { SupabaseClient } from "@supabase/supabase-js";

export async function getFileIds(
  supabase: SupabaseClient<any, "public", any>,
  messageIds: string[]
) {
  const { data: fileWithIds, error } = await supabase
    .from("messages")
    .select("id")
    .not("files", "is", null)
    .in("id", messageIds);
  var fileIds;
  if (Array.isArray(fileWithIds)) {
    fileIds = fileWithIds.map((file) => file.id);
  } else {
    fileIds = [];
  }
  return fileIds;
}
