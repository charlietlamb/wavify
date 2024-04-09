import { useFilesContext } from '@/components/files/state/context'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
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
  const { transientPost, schedule } = useFilesContext()
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
        'text-md flex items-center justify-start p-2 font-bold text-zinc-200 hover:border-zinc-200',
        (isInThePast(endDate) ||
          (isLessThanAnHourAway(endDate) && !isInThePast(endDate))) &&
          'text-red-500'
      )}
    >
      {isInThePast(endDate) ? (
        'Expired'
      ) : isInThePast(startDate) ? (
        <>
          <p className="mr-[6px]">Ends</p>{' '}
          <TransientCountdown date={endDate} className="whitespace-nowrap" />
        </>
      ) : (
        <>
          <p className="mr-[6px]">Starts</p>{' '}
          <TransientCountdown date={startDate} className="whitespace-nowrap" />
        </>
      )}
    </div>
  )
}
