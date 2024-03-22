import { redirect } from 'next/navigation'
import getUser from '../../../actions/getUser'
import { modes, viewModeMap, views } from '@/components/dashboard/data/data'
import { pageMap } from '@/components/dashboard/data/pageMap'
import DashboardProvider from '@/components/dashboard/DashboardProvider'

export default async function page({
  params,
}: {
  params: { view: string; mode: string }
}) {
  const user = await getUser()
  const viewModes = params?.view ? viewModeMap.get(params.view) : undefined
  if (!user) {
    redirect('/account')
  } else if (!user.setup_complete) {
    redirect('/setup')
  }
  if (
    !views.includes(params.view) ||
    !(viewModes && viewModes.includes(params.mode))
  )
    return redirect('/dashboard/overview/general')
  return (
    <div className="h-full w-full flex-grow overflow-y-auto md:overflow-y-hidden">
      <DashboardProvider>
        {pageMap.get(`${params.view}/${params.mode}`)}
      </DashboardProvider>
    </div>
  )
}
