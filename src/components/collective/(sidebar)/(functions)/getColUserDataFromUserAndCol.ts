export async function getColUserDataFromUserAndCol(
  supabase: Supabase,
  user: User,
  collective: Collective
) {
  const { data, error } = await supabase
    .from("colUsers")
    .select("*,users (*),roles (*)")
    .eq("user", user.id)
    .eq("collective", collective.id);
  if (error) throw error;
  if (Array.isArray(data)) {
    return data[0];
  } else {
    return data;
  }
}
