"use server"
import { cookies } from 'next/headers'
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
const supabase = createServerActionClient({ cookies })
export async function checkUnique(username: string, user : User){
  console.log("getting data for: "+username)
    const { data, error } = await supabase
      .from('collectives')
      .select('unique')
      .eq('unique', username)
    if(!data|| !!error){
      return false;
    }
    return !!data.length

}

export async function createCollective(unique: string, user : User){
  await supabase
      .from('collectives')
      .insert([{unique: unique, founder : user.id}]);
}