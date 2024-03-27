import { Dispatch, SetStateAction } from 'react'

export async function deleteResource(
  supabase: Supabase,
  id: string,
  setOpen?: Dispatch<SetStateAction<boolean>>,
  setOpen2?: Dispatch<SetStateAction<boolean>>,
  setLoading?: Dispatch<SetStateAction<boolean>>
) {
  if (setLoading) setLoading(true)
  const { error } = await supabase.from('resources').delete().eq('id', id)
  if (error) throw error
  if (setOpen) setOpen(false)
  if (setOpen2) setOpen2(false)
  if (setLoading) setLoading(false)
}
