import { SupabaseClient } from "@supabase/supabase-js";

export async function getOtherUser(
  supabase: SupabaseClient<any, "public", any>,
  userId: string
) {
  const { data: otherUser } = (await supabase
    .from("users")
    .select()
    .eq("username", userId)
    .single()) as { data: User };

  return otherUser;
}
