import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function removeCollective(
  user: User,
  unique: string,
  supabase: SupabaseClient
) {
  if (Array.isArray(user.collectives)) {
    var updatedCollectives: Json = user.collectives.filter(
      (collective) =>
        collective &&
        typeof collective === "object" &&
        !Array.isArray(collective) &&
        collective.unique !== unique
    );
    if (user.collectives !== updatedCollectives) {
      await supabase
        .from("users")
        .update({ collectives: updatedCollectives })
        .eq("id", user.id);
    }
  }
  return;
}
