import { useFilesContext } from '@/components/files/state/context'
import TransientLabel from './TransientLabel'
import TransientScheduleButton from './TransientScheduleButton'

export default function TransientHeader() {
  const { transientPost } = useFilesContext()

  return (
    <div className="flex items-center divide-x divide-zinc-700">
      <TransientLabel />
      {transientPost && <TransientScheduleButton />}
    </div>
  )
}
