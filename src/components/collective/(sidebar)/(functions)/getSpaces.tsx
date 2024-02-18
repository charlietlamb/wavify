import isObject from '@/lib/isObject'

export async function getSpaces(collective: Collective, supabase: Supabase) {
  const { data: spaces, error } = await supabase
    .from('spaces')
    .select()
    .eq('collective', collective.id)
  if (error) throw error
  return spaces
}
