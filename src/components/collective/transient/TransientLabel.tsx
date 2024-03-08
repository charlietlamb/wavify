import { useFilesContext } from '@/components/files/state/context'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useModal } from '../../../../hooks/use-modal-store'

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
  const { space, transientPost, schedule } = useFilesContext()
  const { onOpen } = useModal()
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    if (schedule) {
      setDate(new Date(schedule.end))
    }
  }, [schedule])
  if (!date) return
  return (
    <>
      {!isInThePast(date) ? (
        <div
          className={cn(
            'flex w-48 items-center justify-start gap-x-2 rounded-md bg-zinc-200 p-2 font-medium text-background_content',
            isLessThanAnHourAway(date) && 'text-red-500',
            transientPost && 'cursor-pointer'
          )}
          onClick={() => {
            if (!transientPost) return
            onOpen('updateTimer', { space, schedule })
          }}
        >
          <p>Expires:</p>
          <Countdown date={date} className="font-semibold" />
        </div>
      ) : (
        <span className="text-red-500">Expired</span>
      )}
    </>
  )
}
