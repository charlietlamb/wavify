import { Button } from '@/components/ui/button'
import { useModal } from '../../../../hooks/use-modal-store'
import { useFilesContext } from '@/components/files/state/context'
import { Settings } from 'lucide-react'

export default function TransientScheduleButton() {
  const { onOpen } = useModal()
  const { space, schedule, schedules, setSchedules, setSchedule } =
    useFilesContext()
  return (
    <Button
      onClick={() =>
        onOpen('schedule', {
          space,
          schedule,
          schedules,
          setSchedules,
          setSchedule,
        })
      }
      variant="zinc_outline"
      className="w-full justify-start rounded-none border-0 bg-black text-left font-normal"
    >
      <Settings />
    </Button>
  )
}
