import { redirect } from 'next/navigation'
import getUser from '../../actions/getUser'

export default async function page() {
  const user = await getUser()
  if (!user) {
    return redirect('/account')
  } else if (!user.setup_complete) {
    return redirect('/setup')
  }

  return redirect('/dashboard/overview/general')
}
