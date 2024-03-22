import { useParams } from 'next/navigation'
import DashboardCalendar from './DashboardCalendar'
import { viewTitleMap } from '../data/data'

export default function DashboardTopTop() {
  const { view } = useParams()
  if (!(typeof view === 'string')) throw new Error('view is not a string')
  return (
    <div className="flex h-full w-full items-center justify-between">
      <h2 className=" text-5xl font-bold">{viewTitleMap.get(view)}</h2>
      {view === 'overview' && <DashboardCalendar />}
    </div>
  )
}
