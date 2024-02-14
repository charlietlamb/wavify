import isObject from "@/lib/isObject";

export async function getColUser(
  user: User,
  collective: Collective,
  supabase: Supabase
) {
  const { data, error } = await supabase
    .from("colUsers")
    .select()
    .eq("user", user.id)
    .eq("collective", collective.id)
    .single();
  if (error) throw error;
  return data;
}