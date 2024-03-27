import { Dispatch, SetStateAction } from 'react'

export async function getResourcesDownloadData(
  supabase: Supabase,
  user: User,
  setDownloads: Dispatch<SetStateAction<number>>,
  startDate: Date,
  endDate: Date
) {
  const { data, error } = await supabase
    .from('actions')
    .select()
    .eq('action', 'download')
    .eq('parent', user.id)
    .not('resource', 'is', null)
    .gte('createdAt', startDate)
    .lte('createdAt', endDate)
  if (error) throw error
  setDownloads(data.length)
}
