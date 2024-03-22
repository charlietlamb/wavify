import { Button } from '@/components/ui/button'
import { useModal } from '../../../../hooks/use-modal-store'
import { useFilesContext } from '@/components/files/state/context'

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
    >
      Edit Schedule
    </Button>
  )
}
