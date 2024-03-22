import { useFilesContext } from '@/components/files/state/context'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useModal } from '../../../../hooks/use-modal-store'
import TransientCountdown from './TransientCountdown'

function isLessThanAnHourAway(date: Date) {
  const now = new Date()
  const differenceInMilliseconds = date.getTime() - now.getTime()
  const differenceInMinutes = differenceInMilliseconds / 1000 / 60
  return differenceInMinutes < 60
}

function isInThePast(date: Date) {
  const now = new Date()
  return date.getTime() < now.getTime()
}

export default function TransientLabel() {
  const {
    space,
    transientPost,
    schedule,
    schedules,
    setSchedules,
    setSchedule,
  } = useFilesContext()
  const { onOpen } = useModal()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  useEffect(() => {
    if (schedule) {
      setStartDate(new Date(schedule.start))
      setEndDate(new Date(schedule.end))
    }
  }, [schedule])

  if (!startDate || !endDate) return null

  return (
    <div
      className={cn(
        'text-md flex items-center justify-start rounded-md border border-zinc-700 p-2 font-medium text-zinc-200 hover:border-zinc-200',
        transientPost && 'cursor-pointer',
        (isInThePast(endDate) ||
          (isLessThanAnHourAway(endDate) && !isInThePast(endDate))) &&
          'text-red-500'
      )}
      onClick={() => {
        if (!transientPost) return
        onOpen('schedule', {
          space,
          schedule,
          schedules,
          setSchedules,
          setSchedule,
        })
      }}
    >
      {isInThePast(endDate) ? (
        'Expired'
      ) : isInThePast(startDate) ? (
        <>
          <p className="mr-[6px]">Ends</p>{' '}
          <TransientCountdown date={endDate} className="" />
        </>
      ) : (
        <>
          <p className="mr-[6px]">Starts</p>{' '}
          <TransientCountdown date={startDate} className="" />
        </>
      )}
    </div>
  )
}
