import { Dispatch, SetStateAction } from 'react'

export async function submitPackageDetails(
  supabase: Supabase,
  space: Space,
  user: User,
  name: string,
  description: string,
  cost: string,
  roleId: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) {
  if (!name) return setErrorMessage('Package name is required')
  if (!description) return setErrorMessage('Package description is required')
  if (!cost) return setErrorMessage('Cost is required')
  if (!roleId) return setErrorMessage('Role is required')
  setLoading(true)
  const { error } = await supabase.from('packages').insert([
    {
      space: space.id,
      role: roleId,
      name,
      description,
      collective: space.collective,
      user: user.id,
      cost: parseFloat(cost),
    },
  ])
  if (error) throw error
  setErrorMessage('')
  setLoading(false)
  setOpen(false)
}
