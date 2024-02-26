export async function deleteSpace(
  spaces: Space[],
  space: Space,
  supabase: Supabase
) {
  const { error } = await supabase.from('spaces').delete().eq('id', space.id)
  if (error) {
    console.error('Error deleting space', error)
  }
  if (
    spaces.some(
      (space1) => space1.order > space.order && space1.type === space.type
    )
  ) {
    const { data: updateData, error: updateError } = await supabase
      .from('spaces')
      .select()
      .eq('collective', space.collective)
      .eq('type', space.type)
      .gt('order', space.order)
    if (updateError) throw updateError

    if (updateData) {
      await Promise.all(
        updateData.map(async (space: Space) => {
          const { error } = await supabase
            .from('spaces')
            .update({ order: space.order - 1 })
            .eq('id', space.id)
          if (error) throw error
        })
      )
    }
  }
}
