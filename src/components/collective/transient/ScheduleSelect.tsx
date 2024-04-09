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
      <SelectTrigger className="flex h-full min-h-10 w-full flex-grow items-center justify-between rounded-none border-0 bg-transparent px-3 py-2 text-sm outline-none ring-offset-0 ring-offset-background placeholder:text-muted-foreground focus:border-t focus:outline-none focus:ring-0 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-0 disabled:border-zinc-700 disabled:opacity-50 [&>span]:line-clamp-1">
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
