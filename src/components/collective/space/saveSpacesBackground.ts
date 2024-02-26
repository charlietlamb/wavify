'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
export async function saveSpacesBackground(spaces: Space[]) {
  const supabase = createServerComponentClient({ cookies })
  try {
    await Promise.all(
      spaces.map(async (space, index) => {
        if (space.order !== index) {
          const { error } = await supabase
            .from('spaces')
            .upsert({ ...space, order: index })
          if (error) throw error
        }
      })
    )
  } catch (error) {
    console.error('Failed to save spaces:', error)
  }
}
