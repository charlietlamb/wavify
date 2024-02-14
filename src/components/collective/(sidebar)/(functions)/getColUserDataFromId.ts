export async function getColUserDataFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase
    .from("colUsers")
    .select("*,users (*),roles (*)")
    .eq("id", id);
  if (error) throw error;
  if (Array.isArray(data)) {
    return data[0];
  } else {
    return data;
  }
}
