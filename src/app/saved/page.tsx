import Saved from '@/components/saved/Saved'
import getUser from '../actions/getUser'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await getUser()
  if (!user) {
    return redirect('/account')
  } else if (user && !user.setup_complete) return redirect('/setup')
  return <Saved />
}
