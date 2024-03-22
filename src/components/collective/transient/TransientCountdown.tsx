import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function TransientCountdown({
  date,
  className,
}: {
  date: Date
  className: string
}) {
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(formatDistanceToNow(date, { addSuffix: true }))
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [date])

  return <div className={className}>{timeRemaining}</div>
}
