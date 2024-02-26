import isObject from '@/lib/isObject'
import { isJson, isMessageAuthor } from '../utilityFunctions'
import { getMessageFiles } from './getMessageFiles'

export async function getNewRenders(newArray: string[], supabase: Supabase) {
  const results = await Promise.all(
    newArray.map(async (message: Json) => {
      const { data, error } = await supabase
        .from('messages')
        .select(
          `
                                    *,
                                    users ( username, profile_pic_url)
                            `
        )
        .eq('id', isObject(message) ? message.id : '')
        .single()
      if (error) throw error
      const fileData = await getMessageFiles(supabase, data as MessageAndAuthor)
      return { ...data, fileData }
    })
  )

  return results as unknown as MessageData[]
}
