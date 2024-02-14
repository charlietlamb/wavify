export async function getCollectiveFromId(supabase: Supabase, id: string) {
  let collective: Collective | null = null;
  try {
    const { data, error } = await supabase
      .from("collectives")
      .select()
      .eq("id", id)
      .single();
    collective = data;
  } catch (error) {
    throw error;
  } finally {
    return collective;
  }
}
