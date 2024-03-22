import { cn } from '@/lib/utils'
import { viewModeMap } from '../data/data'
import { useParams, useRouter } from 'next/navigation'
import {
  AreaChart,
  Bell,
  FileLineChart,
  Gauge,
  Pencil,
  Upload,
} from 'lucide-react'

const modeIconMap = new Map([
  ['general', <Gauge />],
  ['analytics', <AreaChart />],
  ['reports', <FileLineChart />],
  ['notifications', <Bell />],
  ['upload', <Upload />],
  ['manage', <Pencil />],
])

export default function DashboardTopBottom() {
  const { view, mode } = useParams()
  const router = useRouter()
  const modes = viewModeMap.get(view as string) || []
  return (
    <div className="flex">
      <div className="inline-flex gap-x-2 rounded-md border border-zinc-700 p-2 hover:border-zinc-200">
        {modes.map((m) => (
          <>
            <button
              className={cn(
                'hidden rounded-md border border-zinc-800/50 bg-zinc-800/50 px-2 py-1 font-medium text-zinc-400 transition hover:border-zinc-200 lg:flex',
                m === mode &&
                  'border-zinc-700 bg-black text-zinc-200 hover:border-zinc-200 '
              )}
              onClick={() => {
                if (m !== mode) {
                  router.push(`/dashboard/${view}/${m}`)
                }
              }}
            >
              {m.slice(0, 1).toUpperCase() + m.slice(1).toLowerCase()}
            </button>
            <button
              className={cn(
                'flex rounded-md border border-zinc-800/50 bg-zinc-800/50 px-2 py-1 font-medium text-zinc-400 transition hover:border-zinc-200 lg:hidden',
                m === mode &&
                  'border-zinc-700 bg-black text-zinc-200 hover:border-zinc-200 '
              )}
              onClick={() => {
                if (m !== mode) {
                  router.push(`/dashboard/${view}/${m}`)
                }
              }}
            >
              {modeIconMap.get(m)}
            </button>
          </>
        ))}
      </div>
    </div>
  )
}
