import { useFilesContext } from '@/components/files/state/context'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
export default function ScheduleSelect() {
  const { schedule, schedules, setSchedule, setPath, path } = useFilesContext()
  const [scheduleId, setScheduleId] = useState<string>('')

  useEffect(() => {
    if (scheduleId) {
      const newSchedule = schedules.find(
        (schedule) => schedule.id === scheduleId
      )
      if (newSchedule) {
        setPath([path[0]])
        setSchedule(newSchedule)
      }
    }
  }, [scheduleId])

  return (
    <Select
      onValueChange={(e) => setScheduleId(e)}
      value={schedule ? schedule.id : undefined}
    >
      <SelectTrigger className="flex-grow border-zinc-700 transition hover:border-zinc-200 focus:ring-0">
        <SelectValue placeholder="Schedule..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.isArray(schedules) ? (
            schedules?.map((schedule) => {
              return (
                <SelectItem key={schedule.id} value={schedule.id}>
                  {schedule.name}
                </SelectItem>
              )
            })
          ) : (
            <SelectLabel>No Schedules Created...</SelectLabel>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
