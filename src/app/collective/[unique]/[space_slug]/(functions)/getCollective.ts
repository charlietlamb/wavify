export async function getCollective(supabase: Supabase, unique: string) {
  let collective: Collective | null = null;
  try {
    const { data, error } = await supabase
      .from("collectives")
      .select()
      .eq("unique", unique)
      .single();
    collective = data;
  } catch (error) {
    throw error;
  } finally {
    return collective;
  }
}
