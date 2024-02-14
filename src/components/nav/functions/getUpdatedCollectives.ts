import { getUserCollectives } from "./getUserCollectives";

export async function getUpdatedCollectives(
  supabase: Supabase,
  newPayload: { id: string; [key: string]: any }
) {
  return await getUserCollectives(supabase, newPayload as unknown as User);
}
