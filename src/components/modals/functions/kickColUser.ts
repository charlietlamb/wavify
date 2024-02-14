import isObject from "@/lib/isObject";

export async function kickColUser(colUser: ColUserAndData, supabase: Supabase) {
  const { data, error } = await supabase
    .from("colUsers")
    .delete()
    .eq("id", colUser.id)
    .select();

  if (error) throw error;
  if (Array.isArray(data)) {
    return data[0] as unknown as ColUserAndData;
  } else {
    return data as unknown as ColUserAndData;
  }
}
