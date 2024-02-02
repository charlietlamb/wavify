import { SupabaseClient } from "@supabase/supabase-js";

export async function getCollective(
  supabase: SupabaseClient<any, "public", any>,
  unique: string
) {
  const { data: collective } = (await supabase
    .from("collectives")
    .select()
    .eq("unique", unique)
    .single()) as { data: Collective };
  return collective;
}
