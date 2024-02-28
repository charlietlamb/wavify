import { cn } from '@/lib/utils'

export default function Spinner({
  color,
  className,
}: {
  color?: string
  className?: string
}) {
  return (
    <svg
      width="24"
      height="24"
      stroke={color ? color : '#0f0f0f'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('spinner', className)}
    >
      <g>
        <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
      </g>
    </svg>
  )
}
