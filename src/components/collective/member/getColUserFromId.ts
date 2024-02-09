export async function getColUserFromId(
  user: string,
  collective: Collective,
  supabase: Supabase
) {
  const { data, error } = await supabase
    .from("colUsers")
    .select()
    .eq("id", user)
    .eq("collective", collective.id)
    .single();

  if (error) throw error;
  return data as unknown as ColUser;
}
