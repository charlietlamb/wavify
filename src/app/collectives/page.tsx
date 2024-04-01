import { redirect } from 'next/navigation'
import getUser from '../actions/getUser'
import Collectives from '@/components/collectives/Collectives'

export default async function page() {
  const user = await getUser()
  if (!user) return redirect('/account')
  if (!user.setup_complete) return redirect('/setup')
  return <Collectives />
}
