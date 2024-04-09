import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getStorePackages({
  pageParam,
  space,
}: {
  pageParam: number | undefined
  space: Space
}) {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  const { data, error } = await supabase
    .from('packages')
    .select('*,users(*),roles(*)')
    .eq('space', space.id)
    .range(startIndex, endIndex)
  if (error) throw error
  const packages = await Promise.all(
    data.map(async (pack: PackageData) => {
      const { data: spacesData, error: spacesError } = await supabase
        .from('spaces')
        .select()
        .contains('allowed', [pack.roles.id])
        .eq('open', false)
      if (spacesError) throw spacesError
      return { ...pack, spaces: spacesData }
    })
  )
  return packages
}
