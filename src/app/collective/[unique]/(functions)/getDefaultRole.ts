export async function getDefaultRole(
  collective: Collective,
  supabase: Supabase
) {
  const { data: roles, error } = await supabase
    .from("roles")
    .select()
    .eq("collective", collective.id);

  if (error) throw error;

  return roles.reduce((prev, current) => {
    return prev.authority > current.authority ? prev : current;
  });
}
