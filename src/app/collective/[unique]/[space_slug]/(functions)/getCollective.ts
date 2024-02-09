import { SupabaseClient } from "@supabase/supabase-js";

export async function getCollective(
  supabase: SupabaseClient<any, "public", any>,
  unique: string
) {
  const { data: collective, error } = await supabase
    .from("collectives")
    .select()
    .eq("unique", unique)
    .single();
  if (error) throw error;
  return collective as unknown as Collective;
}
